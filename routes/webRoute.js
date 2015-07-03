var express = require('express');
var router = express.Router();
var uploader = require('../middleware/uploader');
var auth = require('../middleware/auth');

var psd = require('../controller/psd');
var sign = require('../controller/sign');


// 全局登陆状态
router.use(auth.loginStatus);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// PSD list
router.get('/psd', psd.renderPsdList);
// PSD 作品详情
router.get('/psd/detail/:psdId/', psd.renderPsdItem);
// PSD 个人分享作品
router.get('/psd/member/:username', psd.renderPsdMember);
// PSD 发布
router.get('/psd/publish', auth.requireLogin, psd.publish);
//PSD 上传
router.post('/psd/upload', uploader.psdUploader(), psd.uploadPsd);

/**
 * sign 登陆注册
 */
// signIn
router.get('/signIn', sign.renderSignIn);
// signIn
router.post('/signIn', sign.signIn);
// signOut
router.get('/signOut', sign.signOut);

module.exports = router;
