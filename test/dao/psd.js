
var Psd = require('../../dao/psd');
var models = require('../../models');
var modelPsd = models.Psd;

//// 创建psd
//Psd.creatPsd({
//    // 分享ID
//    id: '12312355',
//    // cloud 云盘网盘地址
//    cloudUrl: 'http://jbox.jd.com',
//    // 图片地址
//    picUrl: [
//        'http://img30.360buyimg.com/jr_image/jfs/t820/116/981152236/41541/947257f/556436a2N07c2cbf3.jpg',
//        'http://img30.360buyimg.com/jr_image/jfs/t1558/98/214157089/31398/ed3d0780/55644728Nb6a3a55e.jpg'
//    ],
//    author: 'mtmzorro',
//    // 上传人
//    user: '5591057144dc581c4be2f5db'
//}, function(error, doc){
//    if(error){
//        console.log(error);
//    }else{
//        console.log(doc);
//    }
//});

//Psd.getAllPsdsByCreatTime(1, function (error, doc) {
//    if(error){
//        console.log(error);
//    }else{
//        console.log(doc);
//    }
//});
var m = modelPsd;
console.log(modelPsd.count())