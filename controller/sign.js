/**
 * Des
 * Created by zuoshilong on 2015/5/26.
 * E-mail duqichao@jd.com
 * Update 2015/5/26
 */
var validator = require('validator');
var dao = require('../dao');
var User = dao.User;

/**
 * 渲染登陆页
 */
exports.renderSignIn = function (req, res) {

    req.session.loginReferer = req.headers.referer;

    res.render('user/login', {
        title: 'psd!!!'
    });

};

/**
 * 用户登陆
 */
exports.signIn = function (req, res) {

    console.log("用户名称为：" + req.body.username);
    var username = validator.trim(req.body.username);
    var password = validator.trim(req.body.password);

    User.getUsersByName(username, function(error, doc){
        if (!error) {

            console.log(doc);

            // 是否查找到用户
            if (!doc) {
                req.session.loginMsg = "用户名不存在";
                res.send(404);
            }else{

                // 用户名密码是否正确
                if(req.body.username == doc.username && password == doc.password){
                    req.session.user = {
                        username: doc.username,
                        nickname: doc.nickname,
                        lastLoginTime: doc.lastLoginTime,
                        creatTime: doc.creatTime,
                        adminLevel: doc.adminLevel
                    };
                    req.session.loginMsg = "登陆成功";
                    res.send(200);
                }else{
                    req.session.loginMsg = "用户名或密码不正确";
                    res.send(404);
                }

            }

        }else{
            console.log(error);
        }
    });
};

/**
 * 用户登出
 */
exports.signOut = function (req, res) {

    // 清除session
    req.session.destroy();
    res.redirect('/psd');

};
