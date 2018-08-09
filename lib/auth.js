const jwt = require('jsonwebtoken');
const jsonForm = require('./jsonForm.js');
const upDeny = jsonForm.upDeny;
const dml = require('../sql/dml.js');
const svrInfo = require('../config/svrInfo.js');
const log = require('./log.js');
const iLog = log.iLog;
const dLog = log.dLog;
const wLog = log.wLog;
const eLog = log.eLog;

//decode json web token from authrization(req.headers.authrization)
function decodeToken(req){
  let authorization = req.headers.authorization;
  dLog('(decodeToken)' + JSON.stringify(authorization));
  if(authorization){
    let token = jwt.decode(authorization.split('Bearer ')[1]
      .replace(' ', '').replace('\n', ''));
    dLog(token);
    return token;
  }
  else return 0;
}

//token expire period check(true: expire, false: normal token)
function isTokenExpired(token){
  let now = new Date().getTime();
  let expire = token.user.expire;
  if(now > expire) return true;
  else return false;
}

function authz2Id(req){
  let token = decodeToken(req);
  if(token){
    let email = token.user.userId;
    if(email.split('@')[1]) return email.split('@')[0];
  }
  else return '';
}

function authz2Role(req){
  let token = decodeToken(req);
  if(token) return token.user.role;
  else return '';
}

function authz2Expire(req){
  let token = decodeToken(req);
  if(token) return token.user.expire;
  else return '';
}

//change from roleCode to role(1: admin, 2: expert, 3: user)
function code2Role(roleCode){
  if(roleCode == 1) return "admin";
  else if(roleCode == 2) return "expert";
  else if(roleCode == 3) return "user";
}

//token authontication(user permit check)
function authToken(req, res, next){
  let token = decodeToken(req);
  if(token){
    if(isTokenExpired(token)) res.status(403).json(upDeny(2, 'token is expired!'));
    else{
      dLog(token.user.userId);
      dml.isValidUsr(token.user.userId, (cb) => {
        if(cb){
          let role = code2Role(token.user.role);
          let writePermit = svrInfo.writePermit[role];
          if(typeof(writePermit) == 'string' && writePermit == '*') next();
          else if(writePermit.includes(req.originalUrl)) next();
          else res.status(403).json(upDeny(4, 'token permit is denied!'));
        }
        else res.status(403).json(upDeny(3, 'token user info is invalid'));
      });
    }
  }
  else return res.status(403).json(upDeny(1, 'token is not exist!'));
}

function authTokenDn(req, res, next){
  let token = decodeToken(req);
  if(token){
    if(isTokenExpired(token)) res.status(403).json(upDeny(2, 'token is expired!'));
    else{
      dLog(token.user.userId);
      dml.isValidUsr(token.user.userId, (cb) => {
        console.log(cb);
        if(cb){
          console.log(req.originalUrl);
          let role = code2Role(token.user.role);
          let accessPermit = svrInfo.accessPermit[role];
          if(typeof(accessPermit) == 'string' && accessPermit == '*') next();
          else if(accessPermit.includes(req.originalUrl)) next();
          else res.status(403).json(upDeny(4, 'token permit is denied!'));
        }
        else res.status(403).json(upDeny(3, 'token user info is invalid'));
      });
    }
  }
  else return res.status(403).json(upDeny(1, 'token is not exist!'));
}

exports.decodeToken = decodeToken;
exports.isTokenExpired = isTokenExpired;
exports.authz2Id = authz2Id;
exports.authz2Role = authz2Role;
exports.authz2Expire = authz2Expire;
exports.code2Role = code2Role;
exports.authToken = authToken;
exports.authTokenDn = authTokenDn;
