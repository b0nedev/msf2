const express = require('express');
const router = express.Router();
const auth = require('../lib/auth.js');
const authTokenDn = auth.authTokenDn;
const middleware = require('./middleware');
const downloadMiddleware = middleware.downloadMiddleware;

// router.get('', authToken, );
//
//download/culturit/profile=> template_id(ctrit_template)
router.get('/culturit/profile/:id', authTokenDn, downloadMiddleware);
//download/culturit/image=> template_id(template_img)
router.get('/culturit/image/:id', authTokenDn, downloadMiddleware);
//download/culturit/file=> template_id(ctrit_template)
router.get('/culturit/file/:id', authTokenDn, downloadMiddleware);

//download/expert/profile=> user_id(users)
router.get('/expert/profile', authTokenDn, downloadMiddleware);
//download/expert/image=> prj_id(expert_prj)
router.get('/expert/image/:id', authTokenDn, downloadMiddleware);
//download/expert/file=> prj_id(ref_prj_files)
router.get('/expert/file/:id', authTokenDn, downloadMiddleware);
//download/expert/video=> prj_id(ref_prj_files)
router.get('/expert/video/:id', authTokenDn, downloadMiddleware);

//download/user/profile=> user_id(users)
router.get('/user/profile', authTokenDn, downloadMiddleware);
//download/user/file=> play_id(ref_cont_files)
router.get('/user/file/:id', authTokenDn, downloadMiddleware);
//download/culturit/category=> category_id(activity_category)
router.get('/user/category/:id', authTokenDn, downloadMiddleware);

module.exports = router;
