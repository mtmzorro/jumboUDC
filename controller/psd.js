/**
 * Des
 * Created by zuoshilong on 2015/5/26.
 * E-mail duqichao@jd.com
 * Update 2015/5/26
 */
var dao = require('../dao');
var Psd = dao.Psd;

/**
 * 展示 psd 列表
 */
exports.renderPsdList = function (req, res) {

    Psd.getAllPsdsByCreatTime(1, function (error, doc) {
        if (!error) {
            var randerList = [];
            for (var i in doc) {
                var randerObj = {
                    _id: doc[i]._id,
                    picUrl: doc[i].picUrl,
                    updataTime: doc[i].updataTime.getFullYear() + '-' + (doc[i].updataTime.getMonth() + 1) + '-' + doc[i].updataTime.getDate(),
                    cloudUrl: doc[i].cloudUrl,
                    owner: doc[i].owner,
                    username: doc[i].username
                };
                randerList.push(randerObj);
            }

            res.render('psd/index', {
                title: 'psd!!!',
                psds: randerList
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
                updataTime: doc.updataTime.getFullYear() + '-' + (doc.updataTime.getMonth() + 1) + '-' + doc.updataTime.getDate(),
                cloudUrl: doc.cloudUrl,
                owner: doc.owner
            };

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
    //    if (!error) {
    //        console.log(doc.picUrl);
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
    var picUrl = [];
    //console.log(files)

    for(var i in files){
        picUrl.push('/uploads/psd/' + files[i].name);
    }

    // 创建 PSD
    Psd.creatPsd({
        title: title,
        // cloud 云盘网盘地址
        cloudUrl: cloudUrl,
        // 图片地址
        picUrl: picUrl,
        // 上传人
        username: 'admin'
    }, function(error, doc){
        if(error){
            console.log(error);
            res.send(200);
        }else{
            console.log(doc);
            res.send(200);
        }
    });

};
