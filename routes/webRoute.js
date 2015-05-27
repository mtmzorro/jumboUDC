var express = require('express');
var router = express.Router();

var psd = require('../controller/psd');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// PSD list
router.get('/psd', psd.renderPsdList);

// PSD 单品
router.get('/psd/:psdId/', psd.renderPsdItem);


module.exports = router;
