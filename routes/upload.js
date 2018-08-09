const express = require('express');
const router = express.Router();
const authToken = require('../lib/auth.js').authToken;
const middleware = require('./middleware');
const uploadMiddleWare = middleware.uploadMiddleWare;

router.post('/culturit/image', authToken, uploadMiddleWare);
router.post('/culturit/file', authToken, uploadMiddleWare);
router.post('/culturit/category', authToken, uploadMiddleWare);

router.post('/expert/image', authToken, uploadMiddleWare);
router.post('/expert/file', authToken, uploadMiddleWare);
router.post('/expert/video', authToken, uploadMiddleWare);

router.post('/user/file', authToken, uploadMiddleWare);

router.put('/culturit/profile', authToken, );
router.put('/expert/profile', authToken, );
router.put('/user/profile', authToken, );

module.exports = router;
