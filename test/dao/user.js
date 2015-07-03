
var User = require('../../dao/user');

//User.getUsersByName('admin', function (error, doc) {
//    if(error){
//        console.log(error);
//    }else{
//        console.log(doc.nickname);
//    }
//});
//
//User.getUsersByNames(['admin'], function (error, doc) {
//    if(error){
//        console.log(error);
//    }else{
//        console.log(doc[0].nickname);
//    }
//});

//User.creatUser({
//    // 用户名
//    username: 'mtmzorro',
//    // 密码
//    password: 'mtmzorro',
//    // 用户管理级别 0 管理员， 1 普通用户
//    adminLevel: 1,
//    // 用户昵称
//    nickname: 'mtm',
//    // 用户头像
//    avatar: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superplus/img/logo_white_ee663702.png'
//});

User.creatUser({
    // 用户名
    username: 'admin3',
    // 密码
    password: 'admin3',
    // 用户管理级别 0 管理员， 1 普通用户
    adminLevel: 1,
    // 用户昵称
    nickname: '伟龙',
    // 用户头像
    avatar: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superplus/img/logo_white_ee663702.png'
});