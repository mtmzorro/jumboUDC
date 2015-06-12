/**
 * uploader.js
 * 中间件层 上传
 * @author: mtmzorro
 * @date: 2015-6-12 17:54:41
 */

var multer = require('multer');

/**
 * psd 上传中间件
 */
exports.psdUploader = function () {

    return multer({
        dest: './public/uploads/psd/',
        rename: function (fieldname, filename) {
            var f = fieldname;
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
        }
        //putSingleFilesInArray: true
    });

};
