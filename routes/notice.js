const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  res.render('notice', {title: 'notice'});
});

router.put('/', (req, res, next) => {
  res.send('put!!!!!');
});

router.delete('/', (req, res, next) => {
  res.send('delete!!!!');
});

module.exports = router;
