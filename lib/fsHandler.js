const fs = require('fs');
const log = require('./log.js');
const dLog = log.dLog;
const eLog = log.eLog;

//extract extention from file name.
function getExt(fileName){
  let arrName = fileName.split('.');
  if(arrName[arrName.length - 1]){
    return arrName[arrName.length-1];
  }
  else{
    return '';
  }
}

//get file extention type(image/video/file/exception)
function ext2Type(ext){
  let imgExt = ['png', 'jpg', 'jpeg', 'gif'];
  let vdExt = ['mp4', 'avi', 'mkv', 'wmv', 'mov', 'flv'];
  let flExt = ['dat',];
  let istExt = ['msi',];

  if(imgExt.includes(ext)) return 'image';
  else if(vdExt.includes(ext)) return 'video';
  else if(flExt.includes(ext)) return 'file';
  else if(istExt.includes(ext)) return 'app'
  else return 'exception';
}

function getFileType(fileName){
  let ext = getExt(fileName);
  let fileType = ext2Type(ext);
  return fileType;
}

//to make several layer directory.
function mkDir(dirPath){
  let curDir = '';
  let dirArr = dirPath.split('/');
  for(i=0;i<dirArr.length;i++){
    curDir += dirArr[i];
    if(!fs.existsSync(curDir)){
      fs.mkdir(curDir, (err) => {
        if(err) eLog('(mkdir err)' + err);
        else dLog('directory is created!' + curDir);
      });
    }
    curDir += '/';
  }
  curDir = '';
};

function isValidFileType(req){
  let routeFileType = req.originalUrl.split('/')[3];
  let fileType = '';
  dLog('====isValidFileType====');
  if(routeFileType == 'profile') routeFileType='image';
  else if(routeFileType == 'category') routeFileType='image';
  if(req.file){
    fileType = getFileType(req.file.originalname);
    if(fileType == routeFileType) return true;
    else return false;
  }
  else return false;
}

function pathDiv(path){
  let pathArr = path.split('/');
  return pathArr.slice(1, pathArr.length);
}

exports.getExt = getExt;
exports.ext2Type = ext2Type;
exports.getFileType = getFileType;
exports.mkDir = mkDir;
exports.isValidFileType = isValidFileType;
exports.pathDiv = pathDiv;
