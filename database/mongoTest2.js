/**
 * Created by mTmzorro on 2015/3/28.
 */
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");


var TestSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String },
    time : { type:Date, default:Date.now }
});

var TestModel = db.model("test1", TestSchema );

// 查询全部数据
TestModel.find({}, function(error, docs) {
    console.log(docs);
});

//TestModel.find({ "name": "helloworld" }, function (error, docs) {
//    if(error){
//        console.log("error :" + error);
//    }else{
//        console.log(docs); //docs: age为28的所有文档
//    }
//});

//向Model 增加数据
//TestModel.create(
//{
//    name:"model_create",
//    age:26,
//    email: "test@gmail.com"
//},
//function(error,doc){
//    if(error) {
//        console.log(error);
//    } else {
//        console.log(doc);
//    }
//});

// Entity 方法保存
//var TestEntity = new TestModel({
//    name : "jerry",
//    age  : 28,
//    email: "jerry@qq.com"
//});
//TestEntity.save(function(error,doc) {
//    console.log(doc);
//});

// Model update 更新
//var conditions = {name : 'model_update'};
//var update = {$set : {
//    age : 16
//}};
//
//TestModel.update(conditions, update, function(error){
//    if(error) {
//        console.log(error);
//    } else {
//        console.log('Update success!');
//    }
//});

// Model collection remove

//var conditions_2 = { name: 'jerry' };
//
//TestModel.remove(conditions_2, function(error){
//    if(error) {
//        console.log(error);
//    } else {
//        console.log('Delete success!');
//    }
//});