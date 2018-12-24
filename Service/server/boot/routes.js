//import PaymentInstrument from '../../ordersAdaptor';
var url = require('url');
var request = require('request');
var shopifyAdaptor = require('../components/shopify/shopifyAdaptor');
var rest = require('../components/shopify/rest');
var settings = require('../components/shopify/settings');
var settingsObj = new settings();
var restObj = new rest();
var cookie = require('react-cookie');
var shortid = require('shortid');
const FlclError = require('../components/flclLogging/flclError');
let ShopifyOrder = require('../components/shopify/ShopifyOrder');
const Easypost = require('@easypost/api');
let easyPostsettings = require('../components/easyPost/settings');
const _ = require('lodash');
let app = require('../server');
const logger = app.get('logger');
let LoopBackContext = require('loopback-context');
const uuidv1 = require('uuid/v1');
let utils = require('../components/utilities/utils');
let Channel = require('../worker/queueClient');
let publish = require('../worker/queuePublisher');
let CustomerSettings = require('../components/helper/CustomerSettings');
let apiUtils = require('../components/utilities/api-utils');
//START - Log Analytics relatde methods 
const monkeyPatch = function(req, res, next) {
    var oldJson = res.json;
    res.json = function(obj) {
      res.resData = obj;
      oldJson.apply(this, arguments);
    }
    next();
};

const flclMiddleware = function(req, res, next) {
    let ctx = LoopBackContext.getCurrentContext();

    updateContext(ctx);
    
    req.on('canLogData', () => {
        logRequest(req);
        ctx.set('reqLogged', true);
    });
    
    res.on('finish', function() {
        logResponse(req, res, ctx);
    });
    res.on('error', function() {
        logResponse(req, res, ctx);
    });

    return next();
};

const updateContext = (ctx) => {
    ctx.set('requestId', uuidv1());
    ctx.set('inTime', +new Date());
};
const logRequest = (req) => {
    let reqLogData = makeLogData(req, 'request');
    logger.info(reqLogData);
};
const logResponse = (req, res, ctx) => {
    if(!ctx.get('reqLogged') && !ctx.get('fetchingReqDataFromDB'))
        req.emit('canLogData');
    let resLogData = makeLogData(res, 'response');
    logger.info(resLogData);
};
const makeLogData = (apiObj, identifier) => {
    let logData = {};
    switch(identifier) { //TODO: Exclude few prop's from logData.res , which were included in root level(logData)...Ex: statusCode
        case 'request':
            logData.req = apiObj;
            logData.isNewRequest = true;
            logData = injectBasicInfo(logData, apiObj);
            break;
        case 'response':
            logData.res = apiObj;
            logData.isEndOfResponse = true;
            logData.elapsedTime = getElapsedTime();
            break;
    }
    
    return logData;
};

const injectBasicInfo = (logData, apiObj) => {
    let flclParams = apiObj.flclParams || {};
    logData.appId = flclParams.appId || null;
    logData.userId = flclParams.userId || null;
    logData.customerId = flclParams.customerId || null;
    logData.customerName = flclParams.customerName || null;
    logData.companyName = flclParams.companyName || null;
    return logData;
};

const getElapsedTime = () => {
    let context = LoopBackContext.getCurrentContext();
    let inTime = context.get('inTime');
    let outTime = +new Date();
    let timeElapsedInSeconds = (outTime - inTime)/1000;
    return timeElapsedInSeconds;
}

//END - Log Analytics relatde methods

module.exports = (app) => {
    app.use(monkeyPatch);
    app.use(flclMiddleware);   
    app.get('/install', (req, res) => {
        try {
            let urlParts = url.parse(req.url, true);
            let query = urlParts.query;
            let redirectUrl = `https://${query.shop}/admin/oauth/authorize?client_id=${app.get("shopify_api_key")}&scope=read_orders,write_orders,read_fulfillments,write_fulfillments,read_shipping,write_shipping,read_products,write_products&redirect_uri=${app.get("shopify_auth_url")}`;
            let dataSource = app.models.User.dataSource;
            let sql = `SELECT * FROM ShopifyUsers su  WHERE su.StoreName = ? AND su.Status = 1`;
            dataSource.connector.query(sql, [query.shop], (err, user) => {
                if (err) {
                    if (!(err instanceof Error)){
                        err = new Error(err);
                    }
                    let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'install', cause: err, message: 'Error occured in shopify app install', req: req});
                    logger.error(flclError);
                    res.redirect(redirectUrl);
                } else {
                    if (user.length > 0) {
                        logger.info({className: 'ShopifyInstallation', methodName: 'install', message: 'existing user, redirecting to login page', req: req, res: res});
                        res.redirect(app.get('shopify_login_url'));
                    } else {
                        logger.info({className: 'ShopifyInstallation', methodName: 'install', message: 'new user, redirecting to sign up page', req: req, res: res});
                        res.redirect(redirectUrl);
                    }
                }
            });
        } catch (e) {
            let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'install', cause: e, message: `Error occured in shopify app install, redirecting to - ${redirectUrl}`, req: req, res: res});
            logger.error(flclError);
            res.redirect(redirectUrl);
        }
    });
    app.post('/fulfillmentcallback', (req, res) => {
        try {
            let request = req.body;
            request.headers = req.headers;
            logger.info({className: 'Routes', methodName: 'fulfillmentcallback', req: req});
            let shopifyAdaptorObj = new shopifyAdaptor();
            shopifyAdaptorObj._call(request, 'fulfillmentServiceAPI', (err, response) => {
                if (err) {
                    if (!(err instanceof Error))
                        err = new Error(err);
                    let flclError = new FlclError({className: 'Routes', methodName: 'fulfillmentcallback', cause: err, req: req, message: 'Error occured in shopify fulfillmentcalback'});
                    logger.error(flclError);
                }
            });
            res.status(200);
            logger.info({className: 'Routes', methodName: 'fulfillmentcallback', res: res});
            res.end();
        } catch (e) {
            res.status(200);
            let flclError = new FlclError({className: 'Routes', methodName: 'fulfillmentcallback', cause: e, message: 'Error occured in shopify fulfillmentcallback', req: req, res: res});
            logger.error(flclError);
            res.end();
        }
    });
    app.post('/fulfillmentupdatecallback', (req, res) => {
        try {
            let request = req.body;
            request.headers = req.headers;
            logger.info({className: 'Routes', methodName: 'fulfillmentupdatecallback', req: req});
            let shopifyAdaptorObj = new shopifyAdaptor();
            shopifyAdaptorObj._update(request, 'fulfillmentUpdateServiceAPI', (err, response) => {
                if (err) {
                    if (!(err instanceof Error))
                        err = new Error(err);
                    let flclError = new FlclError({className: 'Routes', methodName: 'fulfillmentupdatecallback', cause: err, req: req, message: 'Error occured in shopify fulfillmentupdatecallback'});
                    logger.error(flclError);
                }
            });
            res.status(200);
            logger.info({className: 'Routes', methodName: 'fulfillmentupdatecallback', res: res});
            res.end();
        } catch (e) {
            res.status(200);
            let flclError = new FlclError({className: 'Routes', methodName: 'fulfillmentupdatecallback', cause: e, message: 'Exception occurred in fulfillmentupdatecallback', req: req, res: res});
            logger.error(flclError);
            res.end();
        }
    });
    app.post('/ordercallback', async function(req, res) {
        try {
            logger.info({className: 'Routes', methodName: 'ordercallback', req: req});
            let shopifyOrderObj = new ShopifyOrder();
            await shopifyOrderObj.processOrders(req);
            res.status(200);
            logger.info({className: 'Routes', methodName: 'ordercallback', res: res});
            res.end();
        } catch (e) {
            res.status(200);
            let flclError = new FlclError({className: 'Routes', methodName: 'ordercallback', cause: e, message: 'Exception occurred in ordercallback', req: req, res: res});
            logger.error(flclError);
            res.end();
        }
    });
    
    app.post('/uninstallApp', (req, res) => {
        try {
            logger.info({className: 'Routes', methodName: 'uninstallApp', req: req});
            let store = req.body.domain;
            let dataSource = app.models.User.dataSource;
            const sql = `UPDATE ShopifyUsers SET Status = 0 WHERE StoreName = ${store}`;
            dataSource.connector.query(sql, (err, user) => {
                if (err) {
                    if (!(err instanceof Error)) {
                        err = new Error(err);
                    }
                    res.status(200);
                    let flclError = new FlclError({className: 'Routes', methodName: 'uninstallApp', cause: err, message: 'Error occured in shopify app uninstall', req: req, res: res});
                    logger.error(flclError);
                    res.end();
                } else {
                    res.status(200);
                    logger.info({className: 'Routes', methodName: 'uninstallApp', message: 'uninstall successful', req: req, res: res});
                    res.end();
                }
            });
        } catch (e) {
            res.status(200);
            let flclError = new FlclError({className: 'Routes', methodName: 'uninstallApp', cause: e, message: 'Error occured in shopify app uninstall', req: req, res: res});
            logger.error(flclError);
            res.end();
        }
    });
    app.get('/fulfillmentcallback/fetch_stock', function (req, res) {
        try {
            res.status(200);
            res.end();
        } catch (e) {
        }
    });
    app.get('/fulfillmentcallback/fetch_tracking_numbers', function (req, res) {
        try {
            res.status(200);
            res.end();
        } catch (e) {
        }
    });
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
    };
    app.post('/carriercallback', (req, res) => {
        req.on('close', () => {
            let elapsedTime = getElapsedTime();
            logger.fatal({className: 'Routes', methodName: 'carriercallback', propertyName: 'RateAbort', message: `Shopify has aborted the fetch rates API call. Time Elapsed: ${elapsedTime}ms`, propertyValue: `${elapsedTime}ms`});
            res.end();
        });
        try {
            let request = req.body;
            request.headers = req.headers;
            request.reference = shortid.generate();
            let shopifyAdaptorObj = new shopifyAdaptor();
            logger.info({className: 'Routes', methodName: 'carriercallback', propertyName: 'RateRequest', req: req});

            shopifyAdaptorObj._call(request, 'carrierServiceAPI', (err, response) => {
                if (err) {
                    if (!(err instanceof Error))
                        err = new Error(err);
                    res.status(200).json({});
                    let flclError = new FlclError({className: 'Routes', methodName: 'carriercallback', propertyName: 'RateError', cause: err, req: req, res: res, message: 'Error occured in shopify carriercallback'});
                    logger.fatal(flclError);
                    let elapsedTime = getElapsedTime();
                    if(elapsedTime > 10)
                        logger.fatal({className: 'Routes', methodName: 'carriercallback', propertyName: 'RateTimeout', message: `Rate calculation time has elapsed to more than 15 seconds(meanwhile, the rateAPI call has also been aborted by shopify). Time Elapsed: ${elapsedTime}ms`, propertyValue: `${elapsedTime}ms`});
                    res.end();
                } else {
                    res.status(200).json(response);
                    // log if empty rates are being returned on success
                    if (response && response['rates'] && Array.isArray(response['rates']) && response['rates'].length <= 0) {
                        logger.fatal({className: 'Routes', methodName: 'carriercallback', propertyName: 'RateEmpty', res: res});
                    } else{
                        logger.info({className: 'Routes', methodName: 'carriercallback', propertyName: 'RateResponse', res: res});
                    }
                    let elapsedTime = getElapsedTime();
                    if(elapsedTime > 10)
                        logger.fatal({className: 'Routes', methodName: 'carriercallback', propertyName: 'RateTimeOut', message: `Rate calculation time has elapsed to more than 15 seconds(meanwhile, the rateAPI call has also been aborted by shopify). Time Elapsed: ${elapsedTime}ms`, propertyValue: `${elapsedTime}ms`});
                    res.end();
                }
            });
        } catch (e) {
            res.status(200).json({});
            let flclError = new FlclError({className: 'Routes', methodName: 'carriercallback', propertyName: 'RateError', cause: e, req: req, res: res});
            logger.error(flclError);
            res.end();
        }
    });
    app.post('/CarrierAccount', async (req, res) =>{
        try {
            logger.info({className: 'Routes', methodName: 'CarrierAccount', req: req});
            let productionKey = easyPostsettings.APIKEY['production'];
            const api = new Easypost(productionKey);
            let result = await api.CarrierAccount.all();
            if (result) {
                let value = [];
                result.forEach((element) => {
                    value.push({id: element.id, readable: element.description});
                });
                res.status(200).json(value);
                logger.info({className: 'Routes', methodName: 'CarrierAccount', req: req, res: res});
                res.end();
            } else {
                throw new Error();
            }
        } catch (e) {
            res.status(501).json({});
            let flclError = new FlclError({className: 'Routes', methodName: 'CarrierAccount', cause: e, message: 'Error occured in Carrier Account', req: req, res: res});
            logger.error(flclError);
            res.end();
        }
    });

    app.post('/shopify/subscribeservice', (req, res) => {
        try {
            let dataSource = app.models.User.dataSource;
            let sql1 = 'SELECT * FROM ShopifyUsers WHERE UserID = ' + req.body.user_id;
            dataSource.connector.query(sql1, (err, shopifyuser) => {
                if (err) {
                    res.status(400);
                    let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'subscribeservice', cause: err, message: `Error retrieving user - query - ${sql1}`, req: req, res: res});
                    logger.error(flclError);
                    res.send('Internal error');
                } else {
                    if (shopifyuser[0].EnabledServices == 0) {
                        settingsObj.storeName = shopifyuser[0].StoreName;
                        settingsObj.accessToken = shopifyuser[0].AccessToken;
                        //new code started
                        let resultObj = {};
                        resultObj.sopifyAccessToken = shopifyuser[0].AccessToken;
                        let queue = `shopify-webhooks-queue`;
                        let data = {
                            'store_name': shopifyuser[0].StoreName,
                            'access_token': shopifyuser[0].AccessToken,
                            'user_id': req.body.user_id,
                        };
                        publish(data, queue, Channel, logger).then((res) => {
                            logger.info({className: 'ShopifyInstallation', methodName: 'subscribeservice', message: `published to queue, result - ${res}`});
                        }).catch(function(err) {
                            let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'subscribeservice', cause: err, message: `Error occured in subscribeservice`});
                            logger.error(flclError);
                        });
                        res.status(200);
                        res.send(resultObj);
                    } else {
                        var err = new Error();
                        err.message = "You are already subscribed services with us using your Shopify store. Please contact Shopify for further information."
                        let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'subscribeservice', cause: err, message: 'Error occured in shopify subscribeservice', propertyName: 'request', propertyValue: req});
                        logger.error(flclError);
                        res.status(400);
                        res.send(err);
                    }
                }
            });
        } catch (e) {
            let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'subscribeservice', cause: e, message: 'Error occured in shopify subscribeservice', propertyName: 'request', propertyValue: req});
            logger.error(flclError);
            res.status(400);
            res.send(e);
        }
    });
    app.post('/shopify/accessToken', function (req, res) {
        try {
            settingsObj.storeName = req.body.storename;
            var code = req.body.code;
            var accessToken = settingsObj.obtainAccessToken(code, function (error, respone) {
                if (respone != null && respone != "") {
                    redirectUrl = "https://" + req.body.storename + "/admin/apps";
                    var resultObj = {};
                    resultObj.redirectUrl = redirectUrl;
                    resultObj.sopifyAccessToken = respone.token;
                    resultObj.email = "";
                    resultObj.phone = "";
                    resultObj.company = "";
                    settingsObj.accessToken = respone.token;
                            settingsObj.getShop(function (error, shop) {
                                if (error) {
                                    let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'accessToken', cause: error, message: 'Error occured in shopify accessToken', propertyName: 'request', propertyValue: req});
                                    logger.error(flclError);
                                    var errorArr = [];
                                    var err = new Error();
                                    errorArr.push("You are not able subscribe services with us using your Shopify store");
                                    err.message = errorArr;
                                    res.status(400);
                                    res.send(err);
        
                                } else {
                                    if (typeof shop.errors != 'undefined' && shop.errors != null) {
                                        let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'accessToken', cause: shop.errors, message: 'Error occured in shopify accessToken', propertyName: 'request', propertyValue: req});
                                        logger.error(flclError);
                                        var err = new Error();
                                        if (typeof shop.errors == "string") {
                                            var errorArr = [];
                                            errorArr.push(shop.errors);
                                            err.message = errorArr;
                                        } else {
                                            var keys = Object.keys(shop.errors);
                                            if (keys.length > 0 && typeof shop.errors[keys[0]] != 'undefined') {
                                                err.message = shop.errors[keys[0]];
                                            } else {
                                                var errorArr = [];
                                                var err = new Error();
                                                errorArr.push("You are not able register with us using your Shopify store");
                                                err.message = errorArr;
                                            }
                                        }
                                        res.status(400);
                                        res.send(err);
        
                                    } else if (shop != null) {
                                        resultObj.shopPlan = shop.shop.plan_name;
                                        var dataSource = app.models.User.dataSource;
                                        var sql = 'SELECT * FROM User JOIN ShopifyUsers ON(User.id = ShopifyUsers.UserID) WHERE User.email = "' + shop.shop.email + '" AND ShopifyUsers.StoreName = "' + req.body.storename + '"';
                                        dataSource.connector.query(sql, function (err, user) {
                                            if (err) {
                                                let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'accessToken', cause: err, message: 'Error occured in shopify accessToken', propertyName: 'request', propertyValue: req});
                                                logger.error(flclError);
                                                resultObj.email = shop.shop.email;
                                                resultObj.phone = shop.shop.phone;
                                                resultObj.company = shop.shop.name;
                                                res.status(200);
                                                res.send(resultObj);
                                            } else {
                                                if (user.length > 0) {
                                                    var updusrsql = "UPDATE ShopifyUsers SET Status = 1,AccessToken = '" + respone.token + "',LoginCount=0,EnabledServices=0 where UserID = '" + user[0].id + "'";
                                                    dataSource.connector.query(updusrsql, function (err, upduser) {
                                                        if (err) {
                                                            let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'accessToken', cause: err, message: 'Error occured in shopify accessToken', propertyName: 'request', propertyValue: req});
                                                            logger.error(flclError);
                                                            resultObj.email = shop.shop.email;
                                                            resultObj.phone = shop.shop.phone;
                                                            resultObj.company = shop.shop.name;
                                                            res.status(200);
                                                            res.send(resultObj);
                                                        } else {
                                                            var updpmtsql = "UPDATE ShopifyPayment SET Status = 'DISABLED' where UserID = '" + user[0].id + "'";
                                                            dataSource.connector.query(updpmtsql, function (err, payment) {
                                                                if (err) {
                                                                    let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'accessToken', cause: err, message: 'Error occured in shopify accessToken', propertyName: 'request', propertyValue: req});
                                                                    logger.error(flclError);
                                                                    resultObj.email = shop.shop.email;
                                                                    resultObj.phone = shop.shop.phone;
                                                                    resultObj.company = shop.shop.name;
                                                                    res.status(200);
                                                                    res.send(resultObj);
                                                                } else {
                                                                    resultObj.email = shop.shop.email;
                                                                    resultObj.phone = shop.shop.phone;
                                                                    resultObj.company = shop.shop.name;
                                                                    resultObj.shop = req.body.storename;
                                                                    resultObj.id = user[0].id;
                                                                    resultObj.redirecturl = app.get("shopify_login_url");
                                                                    res.status(200);
                                                                    res.send(resultObj);


                                                                }
                                                            });

                                                        }
                                                    })

                                                } else {
                                                    resultObj.email = shop.shop.email;
                                                    resultObj.phone = shop.shop.phone;
                                                    resultObj.company = shop.shop.name;
                                                    res.status(200);
                                                    res.send(resultObj);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                } else {
                    var err = new Error();
                    err.message = "Shopify response is empty. Please conatct shopify."
                    res.status(400);
                    res.send(err);
                }
            });

        } catch (e) {
            let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'accessToken', cause: e, message: 'Error occured in shopify accessToken', propertyName: 'request', propertyValue: req});
            logger.error(flclError);
            res.status(400);
            res.send(e);
        }
    });
    app.post('/shopify/webhooks', function (req, res) {
        try {
            settingsObj.storeName = req.body.storename;
            settingsObj.accessToken = req.body.sopifyAccessToken;
            if (req.body.webhooks == "ShippingService") {
                if (req.body.method == "create") {
                    let queue = "shopify-webhooks-queue";
                    let data = {
                        'store_name': req.body.storename,
                        'access_token': req.body.sopifyAccessToken,
                        'user_id': req.body.sopifyUserID,

                    };
                    publish(data, queue, Channel, logger).then(function (res) {
                        console.log('published to queue');
                    }).catch(function(err) {
                        let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'webhooks', cause: err, message: `Error occured in webhooks`});
                        logger.error(flclError);
                    });
                    let resultObj = {};
                    resultObj.sopifyAccessToken = req.body.sopifyAccessToken;
                    res.status(200);
                    res.send(resultObj);
                } else if (req.body.method == "delete") {
                    let queue = "shopify-webhooks-delete-queue";
                    let data = {
                        'store_name': req.body.storename,
                        'access_token': req.body.sopifyAccessToken,
                        'user_id': req.body.sopifyUserID,

                    };
                    publish(data, queue, Channel, logger).then(function (res) {
                        console.log('published to queue');
                    }).catch(function(err) {
                        let flclError = new FlclError({className: 'ShopifyInstallation', methodName: 'webhooks', cause: err, message: `Error occured in webhooks`});
                        logger.error(flclError);
                    });
                    let resultObj = {};
                    resultObj.sopifyAccessToken = req.body.sopifyAccessToken;
                    res.status(200);
                    res.send(resultObj);
                }
            }

        } catch (e) {
            let flclError = new FlclError({className: 'Routes', methodName: 'webhooks', cause: e, message: 'Error occured in shopify webhooks', propertyName: 'request', propertyValue: req});
            logger.error(flclError);
        }
    });

    app.post('/shopify/auth', function (req, res) {
        try {
            app.models.user.addCustomer(req.body, function (err, user) {
                if (!err && user != null) {
                    var redirectUrl = "https://" + req.body.shopify.storename + "/admin/apps";
                    var resultObj = {};
                    resultObj.id = user.id;
                    resultObj.redirectUrl = redirectUrl;
                    res.status(200);
                    res.send(resultObj);
                } else {
                    let flclError = new FlclError({className: 'Routes', methodName: 'auth', cause: err, message: 'Error occured in shopify auth', propertyName: 'request', propertyValue: req});
                    logger.error(flclError);
                    res.status(500);
                    res.send(err);
                }

            });
        } catch (e) {
            let flclError = new FlclError({className: 'Routes', methodName: 'auth', cause: e, message: 'Error occured in shopify auth', propertyName: 'request', propertyValue: req});
            logger.error(flclError);
        }
    });

};
