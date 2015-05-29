var express = require('express');
var router = express.Router();

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

module.exports = router;
