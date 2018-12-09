'use strict';
let log = require('./../../server/logger');
let multer = require('multer');
let path = require('path');
let url = 'http://34.209.125.112/';

module.exports = function(Store) {
  Store.getstores = function(req, res, cb) {
    try {
      let db =  Store.dataSource;
      let sql = `SELECT id, shop_name, store_url, image, latitude, longitude, neighbourhood, (SELECT group_concat(CONCAT(COALESCE(cat.id,''), ':', COALESCE(cat.name,''), ':', COALESCE(cat.image_url,'NULL'))SEPARATOR ',') FROM StoreCategory as stc
                 JOIN category as cat
                 on stc.categoty_id = cat.id
                 WHERE stc.store_id = st.id) as category FROM Store as st`;
      db.connector.execute(sql, function(err, stores) {
        if (err) {
          let error = new Error(err);
          error.status = 400;
          return cb(error);
        }
        stores.forEach((item) => {
          if (item.category !== null) {
            let category = item.category.split(',');
            let j = 0;
            let storeCategory = [];
            category.forEach((cat)=>{
              let val = cat.split(':');
              let img = val[2] === 'NULL' ? null : val[2];
              storeCategory[j] = {'id': val[0], 'name': val[1], 'image_url': img};
              j++;
            });
            item.category = storeCategory;
          } else {
            item.category = null;
          }
        });

        cb(null, stores);
      });
    } catch (err) {
      console.error(err);
      log.error(err);
    }
  };

  Store.remoteMethod('getstores', {
    description: 'API to store product information.',
    accepts: [
          {arg: 'req', type: 'object', http: {source: 'req'}},
          {arg: 'res', type: 'object', http: {source: 'res'}},
    ],
    http: {
      path: '/getstores',
      verb: 'get',
    },
    returns: {
      arg: 'data',
      type: 'object',

    },
  });

  Store.getstore = function(req, res, cb) {
    try {
      console.log(req.params.id);
      let db =  Store.dataSource;
      let sql = `SELECT id, user_id, shop_name, store_url, image, tagline, timezone, workinghours, description, latitude, longitude, neighbourhood,
      (SELECT group_concat(CONCAT(COALESCE(cat.id,''), ':', COALESCE(cat.name,''), ':', COALESCE(cat.image_url,'NULL'))SEPARATOR ',') FROM StoreCategory as stc
      JOIN category as cat
      on stc.categoty_id = cat.id
      WHERE stc.store_id = st.id) as category,
      (SELECT CONCAT(ad.adddressone, ':', ad.city, ':', ad.state,':', ad.zipcode, ':', ad.phonenumber)  FROM address as ad WHERE ad.store_id = st.id) as contact 
      FROM Store as st WHERE st.id = ${req.params.id}`;
      db.connector.execute(sql, function(err, stores) {
        if (err) {
          let error = new Error(err);
          error.status = 400;
          return cb(error);
        }
        stores.forEach((item) => {
          if (item.category) {
            let category = item.category.split(',');
            let j = 0;
            let storeCategory = [];
            category.forEach((cat)=>{
              let val = cat.split(':');
              let img = val[2] === 'NULL' ? null : val[2];
              storeCategory[j] = {'id': val[0], 'name': val[1], 'image_url': img};
              j++;
            });
            // let wrkhrs = item.workinghours;
            // console.log(wrkhrs);
            // item.workinghours = wrkhrs.replace(/\\"/gi, ''); ;
            item.category = storeCategory;
          }
          let contact = item.contact.split(':');
          // console.log(contact);
          item.address = contact[0];
          item.city = contact[1];
          item.state = contact[2];
          item.zipcode = contact[3];
          item.phonenumber = contact[4];
          item.contact = null;
        });
        cb(null, stores);
      });
    } catch (err) {
      console.error(err);
      log.error(err);
    }
  };

  Store.remoteMethod('getstore', {
    description: 'API to get store details.',
    accepts: [
          {arg: 'req', type: 'object', http: {source: 'req'}},
          {arg: 'res', type: 'object', http: {source: 'res'}},
    ],
    http: {
      path: '/getstore/:id',
      verb: 'get',
    },
    returns: {
      arg: 'data',
      type: 'object',

    },
  });
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './server/local-storage/images/');
    },
    filename: (req, file, cb) => {
      console.log('file', file);
      let ext = path.extname(file.originalname);
      cb(null, file.fieldname + '_' + Date.now() + ext);
    },
  });
  Store.add = function(req, res, cb) {
    let upload = multer({storage: storage}).array('store', 12);
    upload(req, res, function(err) {
      if (err) {
        let error = new Error(err);
        error.status = 400;
        return cb(error);
      }
      console.log(req.files);
      let path = `${url}images/` + req.files[0].filename;
      console.log(req.body);
      let data = {
        'shop_name': 'test',
        'user_id': req.body.user_id,
        'name': req.body.name,
        'store_url': req.body.storeurl,
        'business_type': 2,
        'timezone': req.body.timezone,
        'workinghours': req.body.workinghours,
        'image': path,
        'tagline': req.body.tagline,
        'description': req.body.description,
        'latitude': 0,
        'longitude': 0,
      };

      Store.create(data, function(err, res) {
        if (err) {
          let error = new Error(err);
          error.status = 400;
          return cb(error);
        }
        let address = {
          'shop_name': 'test',
          'user_id': req.body.user_id,
          'store_id': res.id,
          'contact_name': req.body.name,
          'adddressone': req.body.addressone,
          'city': req.body.city,
          'state': req.body.state,
          'zipcode': req.body.postalcode,
          'phonenumber': req.body.phonenumber,
        };
        Store.app.models.address.create(address, function(err1, res1) {
          if (err) {
            let error = new Error(err);
            error.status = 400;
            return cb(error);
          }
          console.log(res1);
        });
        cb(res.id);
        console.log(address);
      });
    });
  };

  Store.remoteMethod('add', {
    description: 'API to save store details.',
    accepts: [
          {arg: 'req', type: 'object', http: {source: 'req'}},
          {arg: 'res', type: 'object', http: {source: 'res'}},
    ],
    http: {
      path: '/add',
      verb: 'post',
    },
    returns: {
      arg: 'data',
      type: 'object',

    },
  });

  Store.edit = function(req, res, cb) {
    let upload = multer({storage: storage}).array('store', 12);
    upload(req, res, function(err) {
      if (err) {
        let error = new Error(err);
        error.status = 400;
        return cb(error);
      }
      let data = {};
      let file = req.files[0];
      if (file) {
        let path = `${url}images/` + req.files[0].filename;
        console.log(req.body);
        data = {
          'shop_name': 'test',
          'user_id': Number(req.body.user_id),
          'name': req.body.name,
          'store_url': req.body.storeurl,
          'business_type': 2,
          'timezone': req.body.timezone,
          'workinghours': req.body.workinghours,
          'image': path,
          'tagline': req.body.tagline,
          'description': req.body.description,
          'latitude': 0,
          'longitude': 0,
        };

        console.log(data);
      } else {
        data = {
          'shop_name': 'test',
          'user_id': Number(req.body.user_id),
          'name': req.body.name,
          'store_url': req.body.storeurl,
          'business_type': 2,
          'timezone': req.body.timezone,
          'workinghours': req.body.workinghours,
          'image': req.body.image,
          'tagline': req.body.tagline,
          'description': req.body.description,
          'latitude': 0,
          'longitude': 0,
        };
        console.log(data);
      }

      Store.updateAll({id: Number(req.body.store_id)}, data, function(err, res) {
        if (err) {
          let error = new Error(err);
          error.status = 400;
          return cb(error);
        }
        console.log('store', res);
       // cb(null, res);
        let address = {
          'shop_name': 'test',
          'user_id': req.body.user_id,
          'store_id': req.body.store_id,
          'contact_name': req.body.name,
          'adddressone': req.body.addressone,
          'city': req.body.city,
          'state': req.body.state,
          'zipcode': req.body.postalcode,
          'phonenumber': req.body.phonenumber,
        };
        console.log(address);

        Store.app.models.address.updateAll({store_id: Number(req.body.store_id)}, address, function(err1, res1) {
          if (err1) {
            let error = new Error(err1);
            error.status = 400;
            return cb(error);
          }
          console.log('address', res1);
        });
      });
      let storecategory = {
        categoty_id: req.body.business_type,
      };
      console.log(storecategory);
      let db =  Store.dataSource;
      let sql = `UPDATE StoreCategory SET categoty_id = ${Number(req.body.business_type)} WHERE store_id = ${Number(req.body.store_id)}`;
      db.connector.execute(sql, function(err2, res2) {
        if (err2) {
          let error = new Error(err2);
          error.status = 400;
          return cb(error);
        }
        cb(null, res2);
      });
    });
  };

  Store.remoteMethod('edit', {
    description: 'API to edit store details.',
    accepts: [
          {arg: 'req', type: 'object', http: {source: 'req'}},
          {arg: 'res', type: 'object', http: {source: 'res'}},
    ],
    http: {
      path: '/edit',
      verb: 'post',
    },
    returns: {
      arg: 'data',
      type: 'object',

    },
  });
  Store.user = function(req, res, cb) {
    console.log(req.body);

    let data = {};

    if (req.body.businessname) {
      data.username = req.body.businessname;
    }
    if (req.body.email) {
      data.email = req.body.newemail;
    }
    if (req.body.password) {
      data.password = req.body.newpassword;
    }
    // console.log(data);
    Store.app.models.User.update({store_id: 1}, data, function(err, res) {
      if (err) {
        let error = new Error(err);
        error.status = 400;
        return cb(error);
      }
      // cb(null, res);
    });
  };

  Store.remoteMethod('user', {
    description: 'API to edit store details.',
    accepts: {arg: 'req', type: 'object', http: {source: 'req'}},

    http: {
      path: '/user',
      verb: 'post',
    },
    returns: {
      arg: 'data',
      type: 'object',

    },
  });

  Store.remoteMethod('edit', {
    description: 'API to edit store details.',
    accepts: [
          {arg: 'req', type: 'object', http: {source: 'req'}},
          {arg: 'res', type: 'object', http: {source: 'res'}},
    ],
    http: {
      path: '/edit',
      verb: 'post',
    },
    returns: {
      arg: 'data',
      type: 'object',

    },
  });
  Store.getaccdetails = function(req, res, cb) {
    console.log('userid', req.body.userid);
    let db =  Store.dataSource;
    let sql = `SELECT id as userid, username, email, (SELECT id FROM Store as st WHERE st.user_id = us.id) as storeid 
               FROM User as us
               WHERE us.id = ${req.body.userid}`;
    console.log(sql);
    db.connector.execute(sql, function(err, res) {
      if (err) {
        let error = new Error(err);
        error.status = 400;
        console.log(error);
        return cb(error);
      }
      // console.log(res);
      cb(null, res);
    });
  };

  Store.remoteMethod('getaccdetails', {
    description: 'API to edit store details.',
    accepts: [
      {arg: 'req', type: 'object', http: {source: 'req'}},
      {arg: 'res', type: 'object', http: {source: 'res'}},
    ],
    http: {
      path: '/getaccdetails',
      verb: 'post',
    },
    returns: {
      arg: 'data',
      type: 'object',

    },
  });
};
