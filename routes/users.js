const express = require('express');
const router = express.Router();
const middleware = require('./middleware.js');
const signIn = middleware.signIn;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signIn', (req, res, next) => {
  res.render('signIn', {title: 'signIn'});
})

router.post('/signIn', signIn);

module.exports = router;
