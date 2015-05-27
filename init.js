/**
 * init.js
 * 初始化 数据
 */

// 创建 默认管理员账户

var User = require('./dao/user');

// 创建用户
User.creatUser({
    // 用户名
    username: 'admin',
    // 密码
    password: 'admin5239',
    // 用户管理级别 0 管理员， 1 普通用户
    adminLevel: 0,
    // 用户昵称
    nickname: 'mTmzorro'
}, function(error, doc){
    if(error){
        console.log(error);
    }else{
        console.log(doc);
    }
});