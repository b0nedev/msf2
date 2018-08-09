const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../lib/auth.js');
const log = require('../lib/log.js');
const dLog = log.dLog;

const crud = require('../sql/dml.js');
const fsDml = require('../sql/fsDml.js');

const fsHandler = require('../lib/fsHandler');

router.get('/', (req, res, next) => {
  console.log('upload file server test');
  console.log(req);
  res.send(req.headers)
});

router.get('/token/:token', (req, res, next) => {
  let decodeToken = jwt.decode((req.params.token).replace('\n', '').replace(' ', ''));
  console.log(req.params.token);
  console.log(decodeToken);
  res.status(200).json(decodeToken);
});

router.get('/dml', (req, res, next) => {
  let columns = ["user_id", "user_name", "role", "gender"];
  let cond = { user_id: "test@c.com"};
  let colVals = {user_id: "test4@c.com", password: 'qwer1234',
    user_name: "test", role: 0, status: 0, gender: "m", public_flag: 0,
    created_at: new Date()}
  let colvals2 = {user_id: "test44@d.com"};
  let cond2 = {user_id: "test@c.com"};

// // select sql(normal opt)
//   crud.rData('users', 'n', columns, '', '', (cb)=>{
//     console.log(cb);
//     res.send(cb);
//   });

// // select sql(where order by desc)
//   crud.rData('users', 'wod', columns, cond, 'user_id', (cb)=>{
//     console.log(cb);
//     res.send(cb);
//   });

// // insert sql
//   crud.iData('users', colVals, (cb) => {
//     console.log(cb);
//     res.send('test' + JSON.stringify(cb));
//   })


// // update sql
//   crud.uData('users', colvals2, cond2, (cb) => {
//     res.send(cb);
//   });

// // delete sql
//   crud.dData('users', colvals2, (cb) => {
//     res.send(cb);
//   });
  let conds = {user_id: "test3", user_name:"test3", role: 3};
  crud.rData('users', 'w2', ["user_id", "role", "password"], conds, '', (cb) => {
    console.log(cb);
    res.send(cb);
  })
});

router.post('/isValidUsr', (req, res, next) => {
  console.log('isValidUsr route');
  crud.isValidUsr(req.body.id, (cb) => {
    console.log('isValidUsr result');
    console.log(cb);
    res.send(JSON.stringify(cb));
  })
});

router.get('/mergeColVal', (req, res, next) => {
  let cols = ["user_id", "password", "role"];
  let vals = ["expert1@ctr.com", "qwer1234", 0];
  let colVals = fsDml.mergeColVal(cols, vals);
  res.send(colVals);
});

router.get('/onePrjById', (req, res, next) => {
  fsDml.onePrjById('expert1@ctr.com', (cb) => {
    res.send(JSON.stringify(cb));
  });
});

router.get('./onePlayById', (req, res, next) => {
  fsDml.onePlayById(1, )
});

router.get('/test', (req, res, next) => {
  let test = null;
  res.send(Object.keys(test).length);
});




module.exports = router;
