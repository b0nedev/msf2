const log = require('../lib/log.js');
const iLog = log.iLog;
const eLog = log.eLog;
const mysql = require('mysql');
const dbcnf = require('../config/mysqlCnf.js');

let db = mysql.createPool(dbcnf);
db.getConnection((err) => {
  if(err){
    eLog('mysql db connection is failed!');
    console.log(err);
  }
  else{
    iLog('mysql db connection is success!');
  }
});

module.exports.db = db;
