/**
 * auth.js
 * 中间件层 验证用户信息
 * @author: mtmzorro
 * @date: 2015-6-25 18:59:07
 */

/**
 * loginStatus 用户是否登陆状态
 */
exports.loginStatus = function (req, res, next) {

    res.locals.user = req.session.user;
    // 用户是否登陆
    res.locals.isLogin = req.session.user ? true : false;
    // 登陆返回信息
    res.locals.loginMsg = req.session.loginMsg ? req.session.loginMsg : '';

    next();

};

/**
 * requireLogin 检查登陆状态 强制返回登陆页
 */
exports.requireLogin = function (req, res, next) {

    if (!req.session.user) {
        req.session.loginMsg = "请先登录";
        res.redirect('/signIn');
        return;
    }

    next();

};