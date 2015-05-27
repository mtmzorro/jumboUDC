/**
 * user.js
 * 用户model
 * @author: zuoshilong@jd.com
 * @date: 22015-5-26 16:38:58
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    // 用户名
    username: {type: String},
    // 密码
    password: {type: String},
    // 用户管理级别 0 管理员， 1 普通用户
    adminLevel: {type: Number, default: 1},
    // 用户昵称
    nickname: {type: String},
    // 创建时间
    creatTime: {type: Date, default: Date.now},
    // 最后登陆时间
    lastLoginTime: {type: Date, default: Date.now}
});

// 建立索引
UserSchema.index({username: 1}, {unique: true});
UserSchema.index({adminLevel: 2}, {nickname: 3});

mongoose.model('User', UserSchema);