/*
check Datetime format and fixed format
*/

function chkYearForm(yearNum){
  if(yearNum > 0) return yearNum.toString();
  else return 0;
}

function chkMonthForm(monthNum){
  if(monthNum > 0 && monthNum < 10) return "0" + monthNum;
  else if(monthNum >= 10 && monthNum <= 12) return monthNum.toString();
  else return 0;
}

function chkDateForm(dateNum){
  if(dateNum > 0 && dateNum < 10) return "0" + dateNum;
  else if(dateNum >= 10 && dateNum <= 31) return dateNum.toString();
  else return 0;
}

function chkHourForm(hourNum){
  if(hourNum >= 0 && hourNum < 10) return "0" + hourNum;
  else if(hourNum >= 10 && hourNum <= 24) return hourNum.toString();
  else return 0;
}

function chkMSForm(mSNum){
  if(mSNum >= 0 && mSNum < 10) return "0" + mSNum;
  else if(mSNum >= 10 && mSNum <= 60) return mSNum.toString();
  else return 0;
}

exports.year = chkYearForm;
exports.month = chkMonthForm;
exports.date = chkDateForm;
exports.hour = chkHourForm;
exports.miSe = chkMSForm;
