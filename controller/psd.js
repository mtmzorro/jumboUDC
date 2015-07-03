/**
 * Des
 * Created by zuoshilong on 2015/5/26.
 * E-mail duqichao@jd.com
 * Update 2015/5/26
 */

var moment = require('moment');

var dao = require('../dao');
var Psd = dao.Psd;
var User = dao.User;

/**
 * 展示 psd 列表
 */
exports.renderPsdList = function (req, res) {

    // 分页页码
    var pageIndex = parseInt((req.query.page ? req.query.page : 1), 10);
    // 每页数量
    var pageLength = 20;

    // 页码不能小于1 重定向至 psd 首页
    if (pageIndex <= 0) {
        res.redirect('/psd');
        return;
    }

    Psd.getAllPsdsByCreatTime(1, pageIndex, pageLength, function (error, doc, count) {
        if (!error) {

            // 数据列表
            var randerList = [];
            // 分页总数
            var pageCount = Math.ceil(count / pageLength);

            // 超出分页总数 定位到最后一页
            if (pageIndex > pageCount) {
                res.redirect('/psd?page=' + pageCount);
                return;
            }

            doc.forEach(function(item){
                var randerObj = {
                    _id: item._id,
                    title: item.title,
                    picCover: item.picCover,
                    picUrl: item.picUrl,
                    updataTime: moment(item.updataTime).format('YYYY-MM-DD'),
                    cloudUrl: item.cloudUrl,
                    author: item.author.nickname,
                    username: item.author.username
                };
                randerList.push(randerObj);
            });

            // 渲染页面
            res.render('psd/index', {
                psds: randerList,
                pageIndex: pageIndex,
                pageCount: pageCount
            });

        } else {
            console.log(error);
        }

    });


};

/**
 * 展示 psd item
 */
exports.renderPsdItem = function (req, res) {

    var psdId = req.params.psdId;

    Psd.getPsdById(psdId, function (error, doc) {
        if (!error) {

            var randerObj = {
                picUrl: doc.picUrl,
                updataTime: moment(doc.updataTime).format('YYYY-MM-DD'),
                cloudUrl: doc.cloudUrl,
                author: doc.author.nickname,
                viewCount: doc.viewCount + 1
            };

            // 增加浏览数
            Psd.updatePsdById(psdId, {
                viewCount: doc.viewCount + 1
            }, function(error, doc){});

            res.render('psd/item', {
                title: 'psd!!!',
                psds: randerObj
            });

        } else {
            console.log(error);
        }
    });

};

/**
 * 展示 psd 个人
 */
exports.renderPsdMember = function (req, res) {

    var username = req.params.member;

    Psd.getPsdByUsername(username, function (error, doc) {
        if(error){
            console.log(error);
        }else{
            console.log(doc.picUrl);
            res.render('psd/item', {
                title: 'psd!!!',
                psds: doc
            });
        }
    });

};

/**
 * 上传psd
 */
exports.publish = function (req, res) {

    //var username = req.params.member;
    //
    //Psd.getPsdByUsername(username, function (error, doc) {
    //    if (!error) {     //        console.log(doc.picUrl);
    //        res.render('psd/item', {
    //            title: 'psd!!!',
    //            psds: doc
    //        });
    //    } else {
    //        console.log(error);
    //    }
    //});

    res.render('psd/publish', {
        title: 'psd!!!'
        //psds: doc
    });
};
/**
 * 上传psd
 */
exports.uploadPsd = function (req, res) {

    // 图片文件
    var title = req.body.title;
    var type = req.body.type;
    var cloudUrl = req.body.cloudUrl;

    var files = req.files;
    var picCover = '';
    var picUrl = [];

    var username = req.session.user.username;

    for(var i in files){
        if (files[i].fieldname == 'imgcover'){
            picCover = '/uploads/psd/' + files[i].name;
        }else{
            picUrl.push('/uploads/psd/' + files[i].name);
        }
    }

    // 创建 PSD
    Psd.creatPsd({
        title: title,
        // cloud 云盘网盘地址
        cloudUrl: cloudUrl,
        // 封面
        picCover: picCover,
        // 图片地址
        picUrl: picUrl,
        // 上传人
        author: username
    }, function(error, doc){
        if(error){
            console.log(error);
            res.sendStatus(200);
        }else{
            console.log(doc);
            //res.sendStatus(200);
            res.redirect('/psd');
        }
    });

};
