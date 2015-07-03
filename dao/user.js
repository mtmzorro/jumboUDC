/**
 * user.js
 * 操作 models/user
 * @author: mtmzorro
 * @date: 2015-5-26 18:43:31
 */

var models = require('../models');
var User = models.User;

/**
 * [getUsersByUsername 通过用户名单个查找 用户数据]
 * @param  {[type]} username [description]
 */
exports.getUsersByName = function (username, callback) {
    User.findOne({ username: username }, callback);
};

/**
 * [getUsersByUsernames 通过用户名批量查找 用户数据]
 * @param  {[type]} usernames [description]
 */
exports.getUsersByNames = function (usernames, callback) {
    if (usernames.length === 0) {
        return callback(null, []);
    }
    User.find({ username: { $in: usernames } }, callback);
};

/**
 * [creatUser 创建 用户数据]
 * @param  {[type]} user [description]
 */
exports.creatUser = function (user, callback) {
    if (typeof user === 'undefined') {
        return callback(null, []);
    }
    newUser = new User({
        // 用户名
        username: user.username,
        // 密码
        password: user.password,
        // 用户管理级别 0 管理员， 1 普通用户
        adminLevel: user.adminLevel,
        // 用户昵称
        nickname: user.nickname
    });
    newUser.save(callback);
};
