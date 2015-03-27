/**
 * db.js user Model
 * Created by zuoshilong on 2015/3/27.
 * E-mail duqichao@jd.com
 * Update 2015/3/27
 */

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/jumbo');//；连接数据库

var Schema = mongoose.Schema;   //  创建模型
var userSchema = new Schema({
    name: String,
    password: String
}); //  定义了一个新的模型，但是此模式还未和users集合有关联

exports.user = db.model('users', userSchema); //  与users集合关联
