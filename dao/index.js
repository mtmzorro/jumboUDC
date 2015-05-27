/**
 * index.js
 * dao 层 操作model层 入口
 * @author: zuoshilong@jd.com
 * @date: 2015-5-26 18:34:15
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/jumbo', function (err) {
    if (err) {
        console.error('connect to %s error: ' + err.message);
        process.exit(1);
    }
});

// 引入 Models
require('./user');
require('./psd');

exports.User = mongoose.model('User');
exports.Psd = mongoose.model('psd');