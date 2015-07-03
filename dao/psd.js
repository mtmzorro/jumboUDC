/**
 * psd.js
 * 操作 models/psd
 * @author: mtmzorro
 * @date: 2015-5-26 18:43:31
 */

var models = require('../models');
var Psd = models.Psd;

var User = require('./user');

/**
 * [creatPsd 创建 psd分享]
 * @param  {[object]} psd [新上传psd数据]
 * @return {[type]}      [description]
 */
exports.creatPsd = function (psd, callback) {
    if (typeof psd === 'undefined') {
        return callback(null, []);
    }
    User.getUserByName(psd.author, function(error, doc){
        if (!error) {
            newPsd = new Psd({
                title: psd.title,
                // 分享ID
                id: psd.id,
                // cloud 云盘网盘地址
                cloudUrl: psd.cloudUrl,
                // 封面
                picCover: psd.picCover,
                // 图片地址
                picUrl: psd.picUrl,
                // 上传用户
                author: doc._id
            });
            newPsd.save(callback);
        }
    });

};

/**
 * [getAllPsdsByCreatTime 查找全部Psd 按照创建时间排序]
 * @param  {[number]} sort [排序 1为升序 -1为降序]
 * @param  {[number]} pageIndex [页码]
 * @param  {[pageSize]} pageSize [每页数量]
 */
exports.getAllPsdsByCreatTime = function (sort, pageIndex, pageSize, callback) {
    pageIndex -= 1;
    // 获取总数
    Psd.count({}).exec(function(error, count){
        if (!error) {
            // 分页查找
            Psd.find({})
                .sort({creatTime: sort})
                .skip(pageIndex * pageSize)
                .limit(pageSize)
                .populate('author')
                .exec(function(error, doc){
                    /**
                     * @param  {[object]} error [错误信息]
                     * @param  {[object]} doc [查询结果]
                     * @param  {[number]} count [表内数据数量]
                     */
                    callback(error, doc, count);
                });
        }
    });

};

/**
 * [getAllPsdsByUpdateTime 查找全部Psd 按照更新时间排序]
 * @param  {[number]} sort [排序 1为升序 -1为降序]
 */
exports.getAllPsdsByUpdateTime = function (sort, callback) {
    Psd.find({}, null, {sort:{creatTime: sort}}, callback);
};

/**
 * [getPsdById 查找单个psd]
 */
exports.getPsdById = function (psdId, callback) {
    Psd.findOne({ _id: psdId }).populate('author').exec(callback);
};

/**
 * [getPsdByUser 查找单个psd]
 */
exports.getPsdByUsername = function (username, callback) {
    Psd.findOne({ username: username }, callback);
};

/**
 * [updatePsdById 通过ID更新psd]
 */
exports.updatePsdById = function (psdId, options, callback) {
    Psd.update({_id: psdId}, options, callback);
};