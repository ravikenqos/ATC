'use strict';
let multer = require('multer');
let path = require('path');

module.exports = function(Product) {
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './server/local-storage/images/');
    },
    filename: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      cb(null, file.fieldname + '_' + Date.now() + ext);
    },
  });
  Product.add = function(req, res, cb) {
    let upload = multer({storage: storage}).array('product', 12);
    upload(req, res, function(err) {
      if (err) {
        let error = new Error(err);
        error.status = 400;
        return cb(error);
      }
      let path = 'http://localhost:3000/images/' + req.files[0].filename;

      let data = {
        'store_id': req.body.store_id,
        'title': req.body.title,
        'price': req.body.price,
        'description': req.body.price,
        'category': null,
        'image': path,
      };
      let categories = req.body.category;
      let categoryData = {};
      let cat = [];
      Product.create(data, function(err, data) {
        if (err) {
          let error = new Error(err);
          error.status = 400;
          return cb(error);
        }
        for (let item of categories) {
          categoryData.catgory_id = item;
          categoryData.product_id = data.id;
          categoryData.store_id = 7;
          cat.push(categoryData);
        };
        // Product.app.models.category.create(categoryData, function(error, values) {
        //     if (error) {
        //       let error = new Error(error);
        //       error.status = 400;
        //       return cb(error);
        //     }
        // });
  //      console.log(cat);
        cb(null, data);
      });
    });
  };

  Product.remoteMethod('add', {
    description: 'API to store product information.',
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

  Product.edit = function(req, res, cb) {
    let upload = multer({storage: storage}).array('product', 12);
    upload(req, res, function(err) {
      if (err) {
        let error = new Error(err);
        error.status = 400;
        return cb(error);
      }
      let data = {};
      // console.log('files=>', req.files[0]);
      // console.log('data=>', req.body);
      let file = req.files[0];
      if (file) {
        let path = 'http://localhost:3000/images/' + req.files[0].filename;
        data = {
          'store_id': Number(req.body.store_id),
          'title': req.body.title,
          'price': req.body.price,
          'description': req.body.description,
          'category': null,
          'image': path,
        };
      } else {
        data = {
          'store_id': Number(req.body.store_id),
          'title': req.body.title,
          'price': req.body.price,
          'description': req.body.description,
          'category': null,
          'image': req.body.image,
        };
      }

      Product.updateAll({id: Number(req.body.product_id)}, data, function(err, res) {
        if (err) {
          let error = new Error(err);
          error.status = 400;
          return cb(error);
        }
        cb(null, res);
      });
    });
  };

  Product.remoteMethod('edit', {
    description: 'API to update product information.',
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

  Product.deleteselect = function(req, res, cb) {
    let data = req.body;
    let db =  Product.dataSource;
    let sql = `DELETE from product WHERE id IN (${data.toString()})`;
    db.connector.execute(sql, function(err, data) {
      if (err) {
        let error = new Error(err);
        error.status = 400;
        return cb(error);
      }
      cb(null, data);
    });
  };

  Product.remoteMethod('deleteselect', {
    description: 'API to update product information.',
    accepts: [
      {arg: 'req', type: 'object', http: {source: 'req'}},
      {arg: 'res', type: 'object', http: {source: 'res'}},
    ],
    http: {
      path: '/deleteselect',
      verb: 'post',
    },
    returns: {
      arg: 'data',
      type: 'object',

    },
  });

  Product.getproductbystore = function(req, res, cb) {
    try {
      let db =  Product.dataSource;
      let sql = `SELECT pd.id, pd.store_id, pd.title, pd.description, pd.price, pd.image as product_image,  cat.id as category_id, cat.name as category_name, cat.image_url as category_image FROM product as pd 
                  JOIN ProductCategory as pdc
                  ON pdc.product_id = pd.id
                  JOIN category as cat
                  ON cat.id = pdc.catgory_id
                  WHERE pd.store_id = ${req.params.id}`;
      db.connector.execute(sql, function(err, products) {
        if (err) {
          let error = new Error(err);
          error.status = 400;
          return cb(error);
        }

        cb(null, products);
      });
    } catch (err) {
      console.error(err);
    }
  };

  Product.remoteMethod('getproductbystore', {
    description: 'API to get store details.',
    accepts: [
          {arg: 'req', type: 'object', http: {source: 'req'}},
          {arg: 'res', type: 'object', http: {source: 'res'}},
    ],
    http: {
      path: '/getproductbystore/:id',
      verb: 'get',
    },
    returns: {
      arg: 'data',
      type: 'object',

    },
  });
  Product.getproducts = function(req, res, cb) {
    // let db =  Product.dataSource;
    cb(null, 'gotit');
  };
  Product.remoteMethod('getproducts', {
    description: 'API to get all products.',
    accepts: [
          {arg: 'req', type: 'object', http: {source: 'req'}},
          {arg: 'res', type: 'object', http: {source: 'res'}},
    ],
    http: {
      path: '/getproducts',
      verb: 'get',
    },
    returns: {
      arg: 'data',
      type: 'object',

    },
  });
};
