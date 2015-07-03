/**
 * psd.js
 * 操作 models/psd
 * @author: mtmzorro
 * @date: 2015-5-26 18:43:31
 */

var models = require('../models');
var Psd = models.Psd;

/**
 * [creatPsd 创建 psd分享]
 * @param  {[object]} psd [新上传psd数据]
 * @return {[type]}      [description]
 */
exports.creatPsd = function (psd, callback) {
    if (typeof psd === 'undefined') {
        return callback(null, []);
    }
    newPsd = new Psd({
        title: psd.title,
        // 分享ID
        id: psd.id,
        // cloud 云盘网盘地址
        cloudUrl: psd.cloudUrl,
        // 图片地址
        picUrl: psd.picUrl,
        // 上传人 ID
        username: psd.username,
        // 上传人
        owner: psd.owner
    });
    newPsd.save(callback);
};

/**
 * [getAllPsdsByCreatTime 查找全部Psd 按照创建时间排序]
 * @param  {[number]} sort [排序 1为升序 -1为降序]
 */
exports.getAllPsdsByCreatTime = function (sort, callback) {
    Psd.find({}, null, {sort:{creatTime: sort}}, callback);
};

/**
 * [getAllPsdsByUpdataTime 查找全部Psd 按照更新时间排序]
 * @param  {[number]} sort [排序 1为升序 -1为降序]
 */
exports.getAllPsdsByUpdataTime = function (sort, callback) {
    Psd.find({}, null, {sort:{creatTime: sort}}, callback);
};

/**
 * [getPsdById 查找单个psd]
 */
exports.getPsdById = function (psdId, callback) {
    Psd.findOne({ _id: psdId }, callback);
};

/**
 * [getPsdByUser 查找单个psd]
 */
exports.getPsdByUsername = function (username, callback) {
    Psd.findOne({ username: username }, callback);
};