var express = require('express');
var router = express.Router();
var uploader = require('../middleware/uploader');

var psd = require('../controller/psd');

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
router.get('/psd/publish', psd.publish);

//PSD 上传
//router.post('/psd/upload', multer({
//    dest: './public/uploads/psd/',
//    rename: function (fieldname, filename) {
//        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
//    }
//}), psd.uploadPsd);

router.post('/psd/upload', uploader.psdUploader(), psd.uploadPsd);

module.exports = router;
