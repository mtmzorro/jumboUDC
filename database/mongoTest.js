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
var TestEntity = new TestModel({
    name : "helloworld",
    age  : 28,
    email: "helloworld@qq.com"
});

TestEntity.save(function(error,doc){
    if(error){
        console.log("error :" + error);
    }else{
        console.log(doc);
    }
});