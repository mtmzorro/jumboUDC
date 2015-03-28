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

TestModel.find({ "name": "helloworld" }, function (error, docs) {
    if(error){
        console.log("error :" + error);
    }else{
        console.log(docs); //docs: age为28的所有文档
    }
});

// 向Model 增加数据
TestModel.create(
{
    name:"model_create",
    age:26,
    email: "test@gmail.com"
},
function(error,doc){
    if(error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});

// Entity 方法保存
var TestEntity = new TestModel({
    name : "jerry",
    age  : 28,
    email: "jerry@qq.com"
});
TestEntity.save(function(error,doc) {
    console.log(doc);
});

// Model update 更新
var conditions = {name : 'model_update'};
var update = {$set : {
    age : 16
}};

TestModel.update(conditions, update, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Update success!');
    }
});

// Model collection remove

var conditions_2 = { name: 'jerry' };

TestModel.remove(conditions_2, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Delete success!');
    }
});

// 添加测试数据
TestModel.create([
    { name:"test1", age:20 },
    { name:"test2", age:30 },
    { name:"test3", age:24 },
    { name:"test4", age:18 },
    { name:"test5", age:60 },
    { name:"test6", age:50, email:"t6@qq.com" },
    { name:"test7", age:40, email:"t7@163.com" },
    { name:"test8", age:27 },
    { name:"test9", age:27, email:"t9@yeah.net" },
    { name:"test10",age:65 }
], function(error,docs) {
    if(error) {
        console.log(error);
    } else {
        console.log('save ok');
    }
});

// 简单查询 过滤查询
// 返回只包含一个键值name、age的所有记录
TestModel.find({},{name:1, email:1, age: 1, _id:0}, function(err,docs){
    //docs 查询结果集
    console.log(docs);
});

// 只查询第一条
TestModel.findOne({ age: 27}, function (err, doc){
    // 查询符合age等于27的第一条数据
    console.log(doc);
});

// 但它只接收文档的_id作为参数，返回单个文档
TestModel.findById('5516c55481f8a244209b09bf', function (err, doc){
    //doc 查询结果文档
    console.log(doc);
});

// 条件查询
TestModel.find({age:{$gt:18,$lt:60}}, {name:1, email:1, age: 1, _id:0}, function(error,docs){
    //查询所有age大于18小于60的数据
    console.log(docs);
});

// 条件查询不等于
TestModel.find({name:{$ne:"test3"},age:{$lt:27}},function(error, docs){
    //查询name不等于test3、age<27的所有数据
    console.log(docs);
});

// 条件查询 等于
TestModel.find({ age:{$in:[24, 25, 27]}},function(error,docs){
    //可以把多个值组织成一个数组
    console.log(docs);
});

// 条件查询 或
TestModel.find({"$or":[{"name":"test4"},{"age":27}]},function(error,docs){
    console.log(docs);
});

// 条件查询 存在
TestModel.find({email: {$exists: true}},function(error,docs){
    console.log(docs);
});

// 游标 age 升序
TestModel.find({},
    {name: 1, age: 1, _id: 0 },
    {sort:{age: 1 }},
function(err,docs){
    console.log(docs);
});