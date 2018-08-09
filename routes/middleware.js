const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const crud = require('../sql/dml.js');
const fsDml = require('../sql/fsDml.js');
const svrInfo = require('../config/svrInfo');
const jsonForm = require('../lib/jsonForm');
const fsHandler = require('../lib/fsHandler');
const multer = require('../lib/multer.js');
const log = require('../lib/log.js');
const iLog = log.iLog;
const dLog = log.dLog;
const wLog = log.wLog;
const eLog = log.eLog;

function uploadMiddleWare(req, res, next){
  dLog(req.originalUrl);
  multer.uploadFile(req, res, 1);
}

function uploadMiddleWare2(req, res, next){
  dLog(rq.originalUrl);
  multer.uploadFile(req, res, 2);
}

function downloadMiddleware(req, res, next){
  let accessFilePath = svrInfo.accessFilePath;
  let {down, usrType, fileType} = fsHandler.pathDiv(req.originalUrl);
  fsDml.getDownUrl(req, (cb) => {
    console.log(cb);
    let basePath = __dirname.split('/').slice(0, -1).join('/');
    let downPath = basePath + '/' + cb;
    if(fs.existsSync(downPath)) res.download(basePath + '/' + cb);
    else res.status(403).json(jsonForm(0, 'The file is not exist!'));
  });
}

function signIn(req, res, next){
  let userId = req.body.userId;
  let password = req.body.password;
  crud.isValidUsr(userId, (cb) => {
    if(cb){
      try{
        if(bcrypt.compareSync(password, cb.password)){
          dLog('(now)' + new Date().getTime());
          dLog('(expire)' + svrInfo.expirePeriod);
          let expiredAt = ((new Date()).getTime() + svrInfo.expirePeriod);
          dLog('expiredAt)' + expiredAt);
          let userInfo = {userId: cb.user_id, role: cb.role, expire: expiredAt};
          let token = jwt.sign({user: userInfo},'secret', {expiresIn: Math.round(expiredAt/1000)});
          let authorization = "Bearer " + token;
          dLog('(decode token)' + jwt.decode(token));
          dLog('token' + token);
          dLog('authorization' + authorization);
          res.set('authorization', authorization);
          res.status(200).json(jsonForm.signedIn(0, 'welcome! you\'re signed!'));
        }
        else{
          res.status(403).json(jsonForm.nEPwd(0, 'password is not equal!'));
        }
      }
      catch(exception){
        console.log(exception);
      }
    }
    else res.status(403).json(jsonForm.nEPwd(1, 'user id is not accord!'));
  });
}

exports.uploadMiddleWare = uploadMiddleWare;
exports.downloadMiddleware = downloadMiddleware;
exports.signIn = signIn;
