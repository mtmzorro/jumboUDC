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
    //res.render('sign/signup');
    Psd.getAllPsdsByCreatTime(1, function (error, doc) {
        if(error){
            console.log(error);
        }else{
            console.log(doc);
            res.render('psd/index', {
                title: 'psd!!!',
                psds: doc
            });
        }
    });

};

/**
 * 展示 psd item
 */
exports.renderPsdItem = function (req, res) {

    var psdId = req.params.psdId;

    Psd.getPsdById(psdId, function (error, doc) {
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

