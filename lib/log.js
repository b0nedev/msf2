const datetime = require('./dateTime.js');
const utc2Str = datetime.utc2Str;
const logLevel = require('../config/svrInfo.js').logLevel;

const debug = 'd';
const info = 'i';
const warn = 'w';
const err = 'e';

function getModeCode(mode){
  if(mode == debug) return 0;
  else if(mode == info) return 1;
  else if(mode == warn) return 2;
  else if(mode == err) return 3;
}

function log(mode, msg){
  let serverMsg = '';
  let now = utc2Str(new Date(), 'YY-MM-DD HH:mm:SS');
  let modeCode = getModeCode(mode);

  serverMsg += '[' + now + ']'
  if(mode == debug) serverMsg += 'DEBUG: ';
  else if(mode == info) serverMsg += 'INFO: ';
  else if(mode == warn) serverMsg += 'WARN: ';
  else if(mode == err) serverMsg += 'ERROR: ';
  else serverMsg += '';

  if(typeof(msg) == 'string') serverMsg += msg;
  else if(typeof(msg) == 'object') serverMsg += JSON.stringify(msg);

  if(modeCode >= logLevel) console.log(serverMsg);
}

function dLog(msg){
  log(debug, msg);
}

function iLog(msg){
  log(info, msg);
}

function wLog(msg){
  log(warn, msg);
}

function eLog(msg){
  log(err, msg);
}

exports.debug = debug;
exports.info = info;
exports.warn = warn;
exports.err = err;
exports.log = log;
exports.dLog = dLog;
exports.iLog = iLog;
exports.wLog = wLog;
exports.eLog = eLog;
