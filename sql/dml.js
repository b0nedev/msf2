let db = require('../routes/mysql').db;
const jsonForm = require('../lib/jsonForm.js');
const svrInfo = require('../config/svrInfo.js');
const columns = require('../config/columns.js');
const log = require('../lib/log.js');
const dLog = log.dLog;
const iLog = log.iLog;
const wLog = log.wLog;
const eLog = log.eLog;

exports.showPoolInfo = function(){
  console.log(db);
}

/*
- table: database table
- opt(option): 'n': normal, 'w': n + where, 'od': n + order by _ desc,
  'oa': n + order by _ asc, 'wod': n + where + order by _ desc,
  'woa': n + where + order by _ asc,
- colVals: columns and values(key-value shape)
- cond(condition): where statement key and value
- ordCol(order by column)
*/
function rData(table, opt, cols, cond=null, ordCol=null, cb){
  let selectQuery = "SELECT ";
  let condKey = '';
  let condValue = '';
  try{
    if(cond){
      if(Object.keys(cond).length == 1){
        condKey = Object.keys(cond)[0];
        condValue = Object.values(cond)[0];
      }
      else if(Object.keys(cond).length > 1){
        condKey = Object.keys(cond);
        condValue = Object.values(cond);
      }
      else console.log(cond);
    }
    if(opt == 'n')
      selectQuery += cols.toString() + " FROM " + table + ";"
    else if(opt == 'w' || opt == 'w2' || opt == 'w3'){
      selectQuery += cols.toString() + " FROM " + table + " WHERE ";
      if(opt == 'w'){
        selectQuery += condKey + " = ";
        if(typeof(condValue) == 'string')
          selectQuery += "'" + condValue + "';";
        else if(typeof(condValue) == 'number')
          selectQuery += condValue + ";";
      }
      else{
        for(i=0;i<condKey.length;i++){
          selectQuery += condKey[i] + " = ";
          if(typeof(condValue[i]) == 'string')
            selectQuery += "'" + condValue[i] + "' AND ";
          else if(typeof(condValue[i]) == 'number')
            selectQuery += condValue[i] + " AND ";
        }
        selectQuery = selectQuery.slice(0, (selectQuery.length - 5)) + ";";
      }
    }
    else if(opt == 'od' || opt == 'oa'){
      selectQuery += cols.toString() + " FROM " +
        table + " ORDER BY " + ordCol;
      if(opt == 'od') selectQuery += " DESC;";
      else selectQuery += " ASC;";
    }
    else if(opt == 'wod' || opt == 'woa'){
      selectQuery += cols.toString() + " FROM " + table +
        " WHERE " + condKey + " = ";
      console.log(selectQuery);
      console.log(condKey);
      if(typeof(condValue) == 'string')
        selectQuery += "'" + condValue + "'";
      else if(typeof(condValue) == 'number')
        selectQuery += condValue;
      selectQuery += " ORDER BY " + ordCol;
      if(opt == 'wod') selectQuery += " DESC;";
      else selectQuery += " ASC;";
    }
    else if(opt == 'wodl'){
      selectQuery += cols.toString() + " FROM " + table +
        " WHERE " + condKey + " = ";
      console.log(selectQuery);
      console.log(condKey);
      if(typeof(condValue) == 'string')
        selectQuery += "'" + condValue + "'";
      else if(typeof(condValue) == 'number')
        selectQuery += condValue;
      selectQuery += " ORDER BY " + ordCol + " DESC LIMIT 1;";
    }
    else{
      eLog('Non proper opt usage(rdata)');
    }
  }
  catch(exception){
    eLog('===rdata exception===');
    console.log(exception);
  }
  console.log(selectQuery);
  db.query(selectQuery, (err, results) => {
    if(err) cb(0);
    else{
      if(results.length == 1) cb(results[0]);
      else cb(results);
    }
  });
}

function iData(table, colVals, cb){
  let cols = Object.keys(colVals);
  let vals = Object.values(colVals);
  console.log('=====');
  console.log(cols);
  console.log(vals);
  try{
    let insertQuery = "INSERT INTO " + table + "(" + cols.toString() + ") VALUES (?);";
    console.log(insertQuery);
    db.query(insertQuery, [vals], (err, results) => {
      if(err) cb(err);
      else cb(results);
    });
  }
  catch(exception){
    console.log('===idata exception===');
    console.log(exception);
  }
}

function uData(table, colVals, cond, cb){
  let updateQuery = "UPDATE " + table + " SET ";
  let cols = Object.keys(colVals);
  let values = Object.values(colVals);
  let cVLength = cols.length;

  let condKey = Object.keys(cond)[0];
  let condVal = Object.values(cond)[0];

  try{
    for(i=0;i<cVLength;i++){
      if(typeof(values[i]) == 'string'){
        updateQuery += cols[i] + " = '" + values[i] + "',";
      }
      else if(typeof(values[i]) == 'number'){
        updateQuery += cols[i] + " = " + values[i] + ",";
      }

    }
    updateQuery = updateQuery.slice(0, (updateQuery.length)-1);
    updateQuery += " WHERE " + condKey;
    if(typeof(condVal) == 'string'){
      updateQuery += " = '" + condVal + "';";
    }
    else if(typeof(condVal) == 'number'){
      updateQuery += " = " + condVal + ";";
    }

    db.query(updateQuery, (err, results) => {
      if(err) cb(err);
      else cb(results);
    });
  }
  catch(exception){
    console.log('===udata exception===');
    console.log(exception);
  }
}

function dData(table, cond, cb){
  let deleteQuery = "DELETE FROM " + table + " WHERE ";
  let condKey = Object.keys(cond)[0];
  let condVal = Object.values(cond)[0];

  deleteQuery += condKey;
  if(typeof(condVal) == 'string') deleteQuery += " = '" + condVal + "';";
  else if(typeof(condVal) == 'number') deleteQuery += " = " + condVal + ";";
  else console.log(typeof(condVal));
  db.query(deleteQuery, (err, results) => {
    if(err) cb(err);
    else cb(results);
  });
}

function isValidUsr(usrId, cb){
  console.log('isValidUsr internal');
  rData('users', 'w', ["user_id", "password", "role"], {user_id: usrId}, '', (cb2) => {
    console.log(cb2);
    cb(cb2);
  });
}

exports.rData = rData;
exports.iData = iData;
exports.uData = uData;
exports.dData = dData;
exports.isValidUsr = isValidUsr;
