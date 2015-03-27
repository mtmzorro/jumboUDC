var express = require('express');
var router = express.Router();

var user = require('../database/db').user;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/test', function(req, res, next) {

    user.find({},function(err,docs){
        console.log(docs[0].name);
        res.render('index', { title: docs[0].name });
    });


});

module.exports = router;
