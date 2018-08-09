'use strict';

function maliciousErr(message){
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.code = 'MALICIOUS_FILE_EXTENTION';
};

exports.maliciousErr = maliciousErr;
