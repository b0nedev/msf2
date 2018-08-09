chkTimeForm = require('./chkTimeForm');

function date2Time(date){
  return date.getTime();
}

function time2Date(time){
  return new Date(time);
}

function dateUTC(){
  try{
    let now = new Date();
    let utcYear = now.getUTCFullYear();
    let utcMonth = now.getUTCMonth();
    let utcDate = now.getUTCDate();
    let utcHours = now.getUTCHours();
    let utcMinutes = now.getUTCMinutes();
    let utcSeconds = now.getUTCSeconds();
    let utcMilliSeconds = now.getMilliseconds();
    return Date.UTC(utcYear, utcMonth, utcDate,
      utcHours, utcMinutes, utcSeconds, utcMilliSeconds);
  }
  catch(exception){
    console.log(exception);
  }
}

/*
- YY-MM-DD HH:mm:SS
- YY-MM-DD
- HH:mm:SS
- YY-MM-DD_HH:mm
*/
function utc2Str(datetime, format){
  let year = chkTimeForm.year(datetime.getUTCFullYear());
  let month = chkTimeForm.month(datetime.getUTCMonth() + 1);
  let date = chkTimeForm.date(datetime.getUTCDate());
  let hour = chkTimeForm.hour(datetime.getUTCHours());
  let minute = chkTimeForm.miSe(datetime.getUTCMinutes());
  let second = chkTimeForm.miSe(datetime.getUTCSeconds());

  if(format == "YY-MM-DD HH:mm:SS")
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  else if(format == "YY-MM-DD")
    return year + '-' + month + '-' + date;
  else if(format == "HH:mm:SS")
    return hour + ':' + minute + ':' + second;
  else if(format == "YY-MM-DD_HH:mm")
    return year + '-' + month +
      '-' + date + '_' + hour + '-' + minute;
  else return 0;
}

function date2Str(datetime, format){
  let year = chkTimeForm.year(datetime.getFullYear());
  let month = chkTimeForm.month(datetime.getMonth() + 1);
  let date = chkTimeForm.date(datetime.getDate());
  let hour = chkTimeForm.hour(datetime.getHours());
  let minute = chkTimeForm.miSe(datetime.getMinutes());
  let second = chkTimeForm.miSe(datetime.getSeconds());

  if(format = "YY-MM-DD HH:mm:SS")
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
  else if(format == "YY-MM-DD")
    return year + '-' + month + '-' + date;
  else if(format == "HH:mm:SS")
    return hour + ':' + minute + ':' + second;
  else if(format == "YY-MM-DD_HH:mm")
    return year + '-' + month + '-' + date + '_' + hour + '-' + second;
  else return 0;
}

exports.date2Time = date2Time;
exports.time2Date = time2Date;
exports.dateUTC = dateUTC;
exports.utc2Str = utc2Str;
exports.date2Str = date2Str;
