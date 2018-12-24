/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var rest = require('./rest');
const StringHelper = require('../../components/helper/stringHelper');

class ShopifySetup {
    constructor(){
        this.storeName = null;
        this.accesToken = null;
    }

    ObtainAccessToken() {

    }

    getBaseRequest(){
        let req = new rest();
        return req;
    }
}

function settings(loggerObj) {
    self = this;
    var storeName = "";
    var accessToken = "";
    this.logger = loggerObj || logger;
    this.restObj = new rest(this.logger);
}
settings.prototype.obtainAccessToken = function (code, cb) {
    let self = this;
    var request = {
        client_id: app.get("shopify_api_key"),
        client_secret: app.get("shopify_api_secret"),
        code: code
    }
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    self.restObj.url = "https://" + this.storeName + "/admin/oauth/access_token";
    self.restObj.request = request;
    self.restObj.headers = headers;
    var response = self.restObj.doPost(function (error, result, response) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            if (response.statusCode == 200) {
                this.accesToken = JSON.parse(result).access_token;
                var responseObj = {};
                responseObj.token = this.accesToken;
                responseObj.scope = JSON.parse(result).scope;
                return cb(null, responseObj);
            } else {
                return cb(error, null);
            }
        } else {
            return cb(error, null);
        }
    });

}
settings.prototype.createFulfillment = async function (fulfillmentData, orderId, cb) {
    let self = this;
    let headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    /*let locationId = await settings.prototype.getLocationID(this.storeName);
    if(locationId){
        fulfillmentData.fulfillment.location_id = locationId;
    }*/
    self.restObj.url = `https://${this.storeName}/admin/orders/${orderId}/fulfillments`;
    self.restObj.request = fulfillmentData;
    self.restObj.headers = headers;
    console.log('restObj');
    console.log(self.restObj);

    let response = self.restObj.doPost(function (error, result, response) {
        console.log('createFulfillment');
        console.log(error);
        console.log(result);
        var logdata = { className: 'ShopifySetting', StoreName: self.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, JSON.parse(result), response);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.cancelFulfillment = function (fulfillmentid, orderId, cb) {
    let self = this;
    let headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = `https://${this.storeName}/admin/orders/${orderId}/fulfillments/${fulfillmentid}/cancel`;
    self.restObj.headers = headers;
    let response = self.restObj.doPost(function (error, result, response) {
        console.log('cancelFulfillment');
        console.log(error);
        console.log(result);
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result, response);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.createFulFillmentService = function (cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();
    var request = {
        "fulfillment_service": {
            "name": "Flavorcloud Fulfillment Service" + n,
            "handle": "flcl_fulfillment_service",
            "callback_url": app.get("flcl_api_url") + "/fulfillmentcallback",
            "inventory_management": true,
            "tracking_support": true,
            "requires_shipping_method": true,
            "format": "json"
        }
    }
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/fulfillment_services";
    self.restObj.request = request;
    self.restObj.headers = headers;
    var response = self.restObj.doPost(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.getAllFulFillmentService = function (cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/fulfillment_services";
    self.restObj.headers = headers;
    var response = self.restObj.doGet(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.deleteFulFillmentService = function (id, cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/fulfillment_services/" + id;
    self.restObj.headers = headers;
    var response = self.restObj.doDelete(function (error, result) {
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}

settings.prototype.getAllFulFillmentWebhook = function (cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/webhooks";
    self.restObj.headers = headers;
    var response = self.restObj.doGet(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.deleteFulFillmentWebhook = function (id, cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/webhooks/" + id;
    self.restObj.headers = headers;
    var response = self.restObj.doDelete(function (error, result) {
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.createCarrierService = function (cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();
    var request = {
        "carrier_service": {
            "name": "Flavorcloud Shipment Rate Service" + n,
            "callback_url": app.get("flcl_api_url") + "/carriercallback",
            "carrier_service_type": "api",
            "service_discovery": false,
            "active": true,
            "format": "json"
        }
    }
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/carrier_services";
    self.restObj.request = request;
    self.restObj.headers = headers;
    console.log(self.restObj);
    var response = self.restObj.doPost(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.getAllCarrierService = function (cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/carrier_services";
    self.restObj.headers = headers;
    var response = self.restObj.doGet(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.deleteCarrierService = function (id, cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/carrier_services/" + id;
    self.restObj.headers = headers;
    var response = self.restObj.doDelete(function (error, result) {
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.createFullfillmentWebhooks = function (cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();
    var request = {
        "webhook": {
            "topic": "fulfillments/create",
            "address": app.get("flcl_api_url") + "/fulfillmentcallback",
            "format": "json"
        }
    }
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/webhooks";
    self.restObj.request = request;
    self.restObj.headers = headers;
    var response = self.restObj.doPost(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.updateFullfillmentWebhooks = function (cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();
    var request = {
        "webhook": {
            "topic": "fulfillments/update",
            "address": app.get("flcl_api_url") + "/fulfillmentupdatecallback",
            "format": "json"
        }
    }
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/webhooks";
    self.restObj.request = request;
    self.restObj.headers = headers;
    var response = self.restObj.doPost(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}

settings.prototype.updateFullFillments = function (orderid, fulfillmentid, data, cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/orders/" + orderid + "/fulfillments/" + fulfillmentid;
    self.restObj.headers = headers;
    self.restObj.request = { "fulfillment": data };
    var response = self.restObj.doPut(function (error, result) {
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}

settings.prototype.completeFullFillments = function (orderid, fulfillmentid, cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/orders/" + orderid + "/fulfillments/" + fulfillmentid + "/complete";
    self.restObj.headers = headers;
    self.restObj.request = {};
    var response = self.restObj.doPost(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}

settings.prototype.cancelFullFillments = function (orderid, fulfillmentid, cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/orders/" + orderid + "/fulfillments/" + fulfillmentid + "/cancel";
    self.restObj.headers = headers;
    self.restObj.request = {};
    var response = self.restObj.doPost(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}

settings.prototype.getShop = function (cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/shop";
    self.restObj.headers = headers;
    var response = self.restObj.doGet(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, JSON.parse(result));
        } else {
            return cb(error, null);
        }
    });
}
function reflect(promise) {
    return promise.then(function (v) { return { v: v, status: "resolved" } },
        function (e) { return { e: e, status: "rejected" } });
}
async function getMetaFields(products, storeName, accessToken, restObj, logger) {
    let metaFields ={};
    let metaFieldInfoVariants = await getMetaFieldsForVariants(products, storeName, accessToken, restObj, logger);
    if(!metaFieldInfoVariants.has_subscriptions){
        metaFields[products['product_id']] = metaFieldInfoVariants
    }else{
        let metaFieldInfoProduct = await getMetaFieldsForProduct(products, storeName, accessToken, restObj, logger);
        metaFields[products['product_id']] = Object.assign(metaFieldInfoVariants, metaFieldInfoProduct)    
    }
    return metaFields;
}
function getMetaFieldsForVariants(products, storeName, accessToken, restObj, logger) {
    return new Promise((resolve, reject) => {
        try {
            var headers = {
                'User-Agent': 'Super Agent/0.0.1',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': accessToken
            }
            restObj.url = "https://" + storeName + "/admin/products/" + products['product_id'] + "/variants/" + products['variant_id'] + "/metafields";
            restObj.headers = headers;
            let metaFieldInfo =  {has_subscriptions: false};
            let response = restObj.doGet(function (error, result) {
                let logdata = { className: 'ShopifySetting', StoreName: storeName, Time: new Date(), req: restObj, res: result };
                logger.info(logdata);
                if (error){
                    let flclError = new FlclError({className: 'settings', methodName: 'getMetaFields', cause: error, message: `Error occured in getMetaFields store name - ${storeName}`});
                    logger.error(flclError);
                    return reject(error);
                } 
                let resultObj = JSON.parse(result);
                if (typeof resultObj.errors != 'undefined' && resultObj.errors != null) {
                    let flclError = new FlclError({className: 'settings', methodName: 'getMetaFields', cause: resultObj.errors, message: `Error occured in getMetaFields store name - ${storeName}`});
                    logger.error(flclError);
                    return reject(resultObj.errors);
                }
                if (resultObj['metafields'] && resultObj['metafields'].length > 0) {
                    resultObj['metafields'].forEach((item) => {
                        if(StringHelper.compareStrings(item['key'] , 'harmonized_system_code')) {
                            metaFieldInfo['hs_code'] = item['value'];
                        } 
                        if(StringHelper.hasSubString(item['namespace'] , 'subscription')){
                            metaFieldInfo['has_subscriptions'] = true;
                            if(StringHelper.compareStrings(item['key'] , 'frequency', true)) {
                                metaFieldInfo['frequency'] = item['value'];
                            }else if(StringHelper.compareStrings(item['key'] , 'timeInterval', true)) {
                                metaFieldInfo['timeInterval'] = item['value'];
                            }else if(StringHelper.compareStrings(item['key'] , 'timePeriod', true)) {
                                metaFieldInfo['timePeriod'] = item['value'];
                            }
                        }
                    });
                    return resolve(metaFieldInfo);
                } else {
                    console.log("metafields not available: " + restObj.url);
                    return reject("metafields not available: " + restObj.url);                
                }
            });
        }
        catch (e) {
            reject(e.message);
        }
    });
}
function getMetaFieldsForProduct(products, storeName, accessToken, restObj, logger) {
    return new Promise((resolve, reject) => {
        try {
            var headers = {
                'User-Agent': 'Super Agent/0.0.1',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': accessToken
            }
            restObj.url = "https://" + storeName + "/admin/products/" + products['product_id'] + "/metafields";
            restObj.headers = headers;
            let metaFieldInfo = {};
            metaFieldInfo = {paidUpfront:false};
            let response = restObj.doGet(function (error, result) {
                let logdata = { className: 'ShopifySetting', StoreName: storeName, Time: new Date(), req: restObj, res: result };
                logger.info(logdata);
                if (error) {
                    let flclError = new FlclError({className: 'settings', methodName: 'getMetaFields', cause: error, message: `Error occured in getMetaFields store name - ${storeName}`});
                    logger.error(flclError);
                    return reject(error);
                }
                let resultObj = JSON.parse(result);
                if (typeof resultObj.errors != 'undefined' && resultObj.errors != null) {
                    let flclError = new FlclError({className: 'settings', methodName: 'getMetaFields', cause: resultObj.errors, message: `Error occured in getMetaFields store name - ${storeName}`});
                    logger.error(flclError);
                    return reject(resultObj.errors);
                }
                if (resultObj['metafields'] && resultObj['metafields'].length > 0) {
                    resultObj['metafields'].forEach((item) => {
                        if(StringHelper.hasSubString(item['namespace'] , 'subscription')){
                            if(StringHelper.compareStrings(item['key'] , 'paidUpfront', true)) {
                                if(item['value']) {
                                    metaFieldInfo['paidUpfront'] = true;  
                                }      
                            }
                        }
                    });
                    return resolve(metaFieldInfo);
                }
                else {
                    console.log("metafields not available: " + restObj.url);
                    return reject("metafields not available: " + restObj.url);
                }
            });
        }
        catch (e) {
            reject(e.message);
        }
    });
}
settings.prototype.getProductMetaField = function (products, cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var storename = this.storeName;
    var hscodeObj = {};
    var promiseTasks = [];
    for (var i = 0; i < products.length; i++) {
        promiseTasks.push(getMetaFields(products[i], this.storeName, this.accessToken, self.restObj, self.logger));
    }
    Promise.all(promiseTasks.map(reflect)).then(function (results) {
        var errors = results.filter(x => x.status === "rejected");
        var success = results.filter(x => x.status === "resolved");
        var metafilelds = {};

        var logdata = { className: 'ShopifySetting-Metafileds', StoreName: storename, Time: new Date(), res: results };
        self.logger.debug(logdata);

        if (success.length > 0) {
            success.map(function (metafileld) {
                Object.assign(metafilelds, metafileld.v);
            });
            return cb(null, metafilelds);
        } else {
            return cb(errors, null);
        }
    }).catch(err => {
        return cb(err, null);            
    });
}
settings.prototype.createRecurringBilling = function (user_id, type, cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();

    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    var request = {
        "recurring_application_charge": {
            "name": "Flavorcloud Usage Billing Plan",
            "price": 0,
            "capped_amount": parseFloat(app.get("shopify_capped_amount")),
            "terms": "Based on your usage FlavorCloud will bill you daily.",
            "return_url": app.get("flcl_api_url") + "/shopify/billing/activate/" + user_id,
        }

    };
    if (app.get("shopify_billing_sandbox"))
        request.recurring_application_charge.test = app.get("shopify_billing_sandbox");
    else
        request.recurring_application_charge.test = null;
    self.restObj.url = "https://" + this.storeName + "/admin/recurring_application_charges";
    self.restObj.headers = headers;
    self.restObj.request = request;
    var response = self.restObj.doPost(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.getRecurringBilling = function (id, cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/recurring_application_charges/" + id;
    self.restObj.headers = headers;
    var response = self.restObj.doGet(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.activateRecurringBilling = function (id, data, cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/recurring_application_charges/" + id + "/activate";
    self.restObj.headers = headers;
    self.restObj.request = data;
    var response = self.restObj.doPost(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.deleteRecurringBilling = function (id, cb) {  
    let self = this;  
    var d = new Date();
    var n = d.getTime();
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/recurring_application_charges/" + id;
    self.restObj.headers = headers;
    var response = self.restObj.doDelete(function (error, result) {
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.getOrder = function (id) {
    let self = this;
    return new Promise(function (resolve, reject) {
        try {
            var d = new Date();
            var n = d.getTime();
            var headers = {
                'User-Agent': 'Super Agent/0.0.1',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': self.accessToken

            }
            self.restObj.url = "https://" + self.storeName + "/admin/orders/" + id;
            self.restObj.headers = headers;
            var response = self.restObj.doGet(function (error, result) {
                var logdata = { className: 'ShopifySetting', StoreName: self.storeName, Time: new Date(), req: self.restObj, res: result };
                self.logger.debug(logdata);
                if (error == null) {
                    resolve(JSON.parse(result));
                } else {
                    reject(error);
                }
            });
        } catch (e) {
            reject(e.message);
        }
    });

}
settings.prototype.createUninstallWebhooks = function (cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();
    var request = {
        "webhook": {
            "topic": "app/uninstalled",
            "address": app.get("flcl_api_url") + "/uninstallApp",
            "format": "json"
        }
    }
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/webhooks";
    self.restObj.request = request;
    self.restObj.headers = headers;
    var response = self.restObj.doPost(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
settings.prototype.createOrderWebhooks = function (cb) {
    let self = this;
    var d = new Date();
    var n = d.getTime();
    var request = {
        "webhook": {
            "topic": "orders/create",
            "address": app.get("flcl_api_url") + "/ordercallback",
            "format": "json"
        }
    }
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken

    }
    self.restObj.url = "https://" + this.storeName + "/admin/webhooks";
    self.restObj.request = request;
    self.restObj.headers = headers;
    var response = self.restObj.doPost(function (error, result) {
        var logdata = { className: 'ShopifySetting', StoreName: this.storeName, Time: new Date(), req: self.restObj, res: result };
        self.logger.debug(logdata);
        if (error == null) {
            return cb(null, result);
        } else {
            return cb(error, null);
        }
    });
}
function doDeleteExistingWebhook(id, storeName, accessToken){  
    let self = this;  
    return new Promise((resolve, reject) => {
        try {
            var headers = {
                'User-Agent': 'Super Agent/0.0.1',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': accessToken
        
            }
            self.restObj.url = "https://" + storeName + "/admin/webhooks/" + id;
            self.restObj.headers = headers;
            self.restObj.request = {};
            var response = self.restObj.doDelete(function (error, result) {
                resolve(true);
            });
        }catch(err){
            resolve(true);
        }
    });
    
}
settings.prototype.deleteExistingWebhooks = function (cb) {    
    let self = this;
    try{
        var headers = {
            'User-Agent': 'Super Agent/0.0.1',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': this.accessToken
    
        }
        self.restObj.url = "https://" + this.storeName + "/admin/webhooks";
        self.restObj.headers = headers;
        let $setting = this;
        var response = self.restObj.doGet(function (error, res) {
            if (error == null) {
                let result = JSON.parse(res);
                if(result && result.webhooks && result.webhooks.length > 0){
                    var promiseTasks = [];
                    result.webhooks.forEach((webhook) => {
                        if(webhook.id){
                            promiseTasks.push(doDeleteExistingWebhook(webhook.id, $setting.storeName, $setting.accessToken));
                        }
                    });
                    Promise.all(promiseTasks.map(reflect)).then(function (results) {
                        return cb(null, true);
                    }).catch(err => {
                        return cb(err, false);            
                    });
                }else
                    return cb(null, true);
            } else {
                return cb(error, false);
            }
        });
    }catch(err){
        return cb(err, false);      
    }
   
}
settings.prototype.getLocationID = function (storeName) {
    let self = this;
    console.log('getLocationID');
    return new Promise(function (resolve, reject) {
        app.models.Shopifyusers.findOne({where: {storename: storeName}}, function(err, shopifyuser){
            console.log(err);
            console.log(shopifyuser)
            if(err){
                return resolve('');
            }
            if(!shopifyuser){
                return resolve('');
            }else if(shopifyuser && shopifyuser['locationid']){
                return resolve(shopifyuser['locationid']);
            }else{
                return resolve('');
            }
        });

    });
}
settings.prototype.updateLocationID = function (store, fulfillmentObj, cb) {
    let self = this;
    console.log('updateLocationID');
    console.log(fulfillmentObj);
    console.log(store);
    let locationId = fulfillmentObj['fulfillment_service']['location_id'];
    let sql = 'UPDATE ShopifyUsers SET LocationID = ? WHERE StoreName = ?';
    let dataSource = app.models.Shopifyusers.dataSource;
    if(locationId && store){
        dataSource.connector.query(sql, [locationId, store], function(err, user) {
            console.log(err);
            if (err) {
                return cb(err);
            } 
            return cb(null, true);
        });
    }else{
        return cb(new Error(`Nothing updated in shoify user table`));
    }
    
}
module.exports = settings;