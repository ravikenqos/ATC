'use strict';

let db = {
  name: 'db',
  connector: 'memory',
};

let mysqlds = { };
mysqlds.host =  process.env.DB_HOST || 'localhost';
mysqlds.port = process.env.DB_PORT || 3306;
mysqlds.url = '';
mysqlds.database = process.env.DB_NAME || 'atc-service';
mysqlds.password = process.env.DB_PWD || 'AroundTheCorner';
mysqlds.name = 'mysqlds';
mysqlds.user = process.env.DB_USERNAME || 'atc';
mysqlds.connector = 'mysql';
 
module.exports = {db, mysqlds};
