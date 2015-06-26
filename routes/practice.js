var express = require('express');
var router = express.Router();

//var user = require('../database/db').user;


//router.all("*", function(req, res, next) {
//    console.log(req.path);
//    console.log(req.host);
//    next();
//});

// session
router.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* query基本用法 */
router.get('/query', function(req, res, next) {

    //query是一个可获取客户端get请求路径参数的对象属性，包含着被解析过的请求参数对象，默认为{}。
    console.log(req.query);
    res.send("测试query属性!"+ req.query.user);
});

/* param基本用法 */
router.get('/param', function(req, res, next) {

    // 获取请求param路径的参数值，如/?n=Lenka
    console.log(req.param("n")); //Lenka
    res.send("使用req.param属性参数对象值!:" + req.param("n"));

});

/* param基本用法 路由规则 */
// 我们也可以获取具有相应路由规则的请求对象，假设路由规则为 /param/:name/，请求路径/param/mike
router.get('/param/:name/', function(req, res, next) {

    console.log(req.param("name")); //Lenka
    res.send("使用req.param属性获取具有路由规则的参数对象值!:" + req.param("name"));

});

/* params基本用法 路由规则 */

router.get('/params/:name/', function(req, res, next) {

    console.log(req.params.name); //Lenka
    res.send("使用req.params属性获取具有路由规则的参数对象值!:" + req.params.name);

});

router.get('/params/:name/:id', function(req, res, next) {

    console.log(req.params.name); //Lenka
    res.send("使用req.params属性获取具有路由规则的参数对象值!:" + req.params.name + ', ' + req.params.id);

});

/* send基本用法 */
// send()方法向浏览器发送一个响应信息，并可以智能处理不同类型的数据。格式如下：
router.get('/send', function(req, res, next) {

    //res.send([body|status], [body]);

    // 1.当参数为一个String时，Content-Type默认设置为"text/html"。
    //res.send('Hello World');

    // 2.当参数为Array或Object时，Express会返回一个JSON。
    res.send({ user: 'tobi' }); //json 格式 {"user":"tobi"}
    //res.send([1,2,3]); //[1,2,3]

    // 3.当参数为一个Number时，并且没有上面提到的任何一条在响应体里，Express会帮你设置一个响应体，比如：200会返回字符"OK"。
    //res.send(200); // OK
    //res.send(404); // Not Found
    //res.send(500); // Internal Server Error
});

/* render 和 redirect */
// index
router.get('/test', function(req, res, next) {
    res.render('practice/index', { title: 'Express' });
    // 重定向
    //res.redirect("test/login");
});

// login
router.get('/test/login', function(req, res, next) {
    res.render('practice/login', { title: 'Express' });
});

// home
router.get('/test/home',function(req,res, next){
    if(req.session.user){
        res.render('practice/home');
    }else{
        req.session.error = "请先登录";
        res.redirect('/test/login');
    }
});


/* login post */
router.post('/test/login',function(req,res, next){
    console.log("用户名称为：" + req.body.username);

    var user={
        username:'admin',
        password:'admin'
    };

    if(req.body.username == user.username && req.body.password == user.password){
        req.session.user = user;
        res.send(200);
    }else{
        req.session.error = "用户名或密码不正确";
        res.send(404);
    }
});

router.get('/test/logout',function(req,res, next){
    req.session.user = null;
    req.session.error = null;
    res.redirect('/test');
});

module.exports = router;
