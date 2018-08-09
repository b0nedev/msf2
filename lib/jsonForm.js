//json data format
function makeBaseForm(){
  return {
    kind: "",
    code: null,
    timeZone: "KST",
    lang: "KR",
    snippet: {}
  }
}

//input date to json data format
function makeJsForm(kind, code, snippet){
  let jsForm = makeBaseForm();
  jsForm.kind = kind;
  jsForm.code = code;
  jsForm.snippet = snippet;
  return jsForm;
}

//upload OK json format value(upload.js)
function upOk(code, msg, fileType, fileSize, fileName){
  let upOk = makeJsForm(
    "file#upload#ok",
    0,
    {
      code: code, msg: msg, type: fileType,
      size: fileSize, name: fileName
    }
  );
  return upOk;
};

//upload Fail json format value(upload.js)
function upFail(code, msg, fileType){
  let upFail = makeJsForm(
    "file#uplad#fail",
    1,
    {code: code, msg: msg, type: fileType}
  );
  return upFail;
};

//upload deny json format value
function upDeny(code, msg){
  let upDeny = makeJsForm(
    "file#upload#deny",
    2,
    { code: code, msg: msg}
  );
  return upDeny;
}

function signedIn(code, msg){
  let signIn = makeJsForm(
    "file#signIn#ok",
    3,
    {code: code, msg: msg}
  );
  return signIn;
}

function nEPwd(code, msg){
  let nEPwd = makeJsForm(
    "file#signIn#fail",
    4,
    {code: code, msg: msg}
  );
  return nEPwd;
}

function downDeny(code, msg){
  let downDeny = makeJsForm(
    "file#download#deny",
    5,
    {code: code, msg: msg}
  );
  return downDeny;
}

exports.upOk = upOk;
exports.upFail = upFail;
exports.upDeny = upDeny;
exports.signedIn = signedIn;
exports.nEPwd = nEPwd;
