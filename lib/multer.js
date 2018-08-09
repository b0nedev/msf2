const multer = require('multer');
const svrInfo = require('../config/svrInfo.js');
const fsHandler = require('./fsHandler.js');
const {randNDigits, rand5Digits} = require('./rand.js');
const dateTime = require('./dateTime.js');
const auth = require('./auth.js');
const authz2Id = auth.authz2Id;
const jsonForm = require('./jsonForm.js');
const customErr = require('./customErr.js');
const maliciousErr = customErr.maliciousErr;
const fsDml = require('../sql/fsDml.js');
const log = require('./log.js');
const iLog = log.iLog;
const dLog = log.dLog;
const wLog = log.wLog;
const eLog = log.eLog;

let upDir = 'upload/';
let accessFileName = '';
let fsTp = '';

function setDestination(req, file, cb){
  try{
    dLog('(file)' + JSON.stringify(file));
    fsTp = fsHandler.getFileType(file.originalname);
    let userId = authz2Id(req);
    dLog('(userId)' + userId);
    let upPath = upDir + svrInfo.accessFilePath + userId + '/' + fsTp;
    dLog('(up path)' + upPath);
    fsHandler.mkDir(upPath);
    cb(null, './' + upPath);
  }
  catch(exception){
    console.log(exception);
  }
}

function mkFileName(req, file, cb){
  try{
    let ext = '.' + fsHandler.getExt(file.originalname);
    let fileName = dateTime.utc2Str(new Date(), "YY-MM-DD_HH:mm") +
      '_' + rand5Digits();
    let userId = authz2Id(req);

    if(userId){
      accessFileName = userId + '_' + fileName + ext;
      return cb(null, accessFileName);
    }
    else{
      accessFileName = 'anonymous_' + fileName + ext
      return cb(null, accessFileName);
    }
  }
  catch(exception){
    eLog(exception);
  }
}

function uploadFilter(req, file, cb){
  fsTp = fsHandler.ext2Type(file.originalname);
  let ext = fsHandler.getExt(file.originalname);
  if(ext){
    if(svrInfo.dangerExt.includes(ext)){
      wLog('dangerous File is detected!');
      //cb(null, false);
      cb(new maliciousErr('The file type is identified as a malcious file!', 1))
    }
    else{
      iLog('stable file');
      cb(null, true);
    }
  }
  else cb(null, true);
}

var storage = multer.diskStorage({
  destination: setDestination,
  filename: mkFileName
});

var upload = multer({
  storage: storage,
  limits: {fileSize: svrInfo.uploadLImit},
  fileFilter: uploadFilter
}).single('userFile');

function errHandler(err, res){
  if(err.code){
    dLog('(upload err) ' + err.code);
    if(err.code == 'MALICIOUS_FILE_EXTENTION')
      res.status(400).json(jsonForm.upFail(1, err.message));
    else if(err.code == 'LIMIT_FILE_SIZE')
      res.status(400).json(jsonForm.upFail(1, 'The file size is exceeded!'));
  }
}

function uploadFile(req, res, mode){
  upload(req, res, (err) => {
    if(err) errHandler(err, res);
    else{
      if(fsHandler.isValidFileType(req)){
        dLog('uploadFile>req.file>' + JSON.stringify(req.file));
        if(mode == 1) fsDml.logUpload(req);
        else fsDml.logUpload2(req);
        res.status(200).json(jsonForm.upOk(0, 'The file is uploaded!',
          req.file.mimetype, req.file.size, req.file.originalname));
      }
      else res.status(400).json(jsonForm.upFail(0, 'The file type is not correct!'));
    }
  });
}

exports.uploadFile = uploadFile;
