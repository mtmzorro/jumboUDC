/**
 * psd.js
 * psd分享平台 model
 * @author: zuoshilong@jd.com
 * @date: 22015-5-26 16:38:58
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PsdSchema = new Schema({
    // 分享ID
    id: {type: String},
    // cloud 云盘网盘地址
    cloudUrl: {type: String},
    // 图片地址
    picUrl: {type: Array},
    // 上传人
    owner: {type: String},
    // 点赞数
    praiseCount: {type: Number, default: 0},
    // 创建时间
    creatTime: {type: Date, default: Date.now},
    // 最后更新时间
    updataTime: {type: Date, default: Date.now}
});

// 建立索引
PsdSchema.index({id: 0});
PsdSchema.index({cloudUrl: 1});
PsdSchema.index({picUrl: 2});

mongoose.model('Psd', PsdSchema);