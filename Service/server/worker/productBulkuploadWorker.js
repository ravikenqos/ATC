'use strict';

const csv = require('csvtojson');
const request = require('request');

/**
 * @class ProductBulkuploadWorker
 */
class ProductBulkuploadWorker {
  
 /**
  * 
  * @param {*} data 
  */
  async processMessage(data) {
    try {
        let dataJson = JSON.parse(data);
        console.log(dataJson);
        let jsonObj =  await csv().fromFile(dataJson.productsCsv);
        console.log("jsonObj", jsonObj);
        //url = process.env.API_URL || 'http://localhost:3000/api/';
        url = process.env.API_URL || 'http://34.209.125.112/api/';
        url = `${url}uploadinformations/products`;
        request.post({url: url, form: {data: jsonObj, storeid: dataJson.storeid, filename: dataJson.filename}}, function(err, httpResponse, body) {
          if(err)
  //            log.error(err);
          console.log("Body", body);
        });
    } catch (error) {
//      log.error(error);
      console.log(error);
    }
  }
}
module.exports = ProductBulkuploadWorker;
// new ProductBulkuploadWorker();