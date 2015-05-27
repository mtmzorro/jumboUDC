
var User = require('../../dao/user');

User.getUsersByName('admin', function (error, doc) {
    if(error){
        console.log(error);
    }else{
        console.log(doc.nickname);
    }
});

User.getUsersByNames(['admin'], function (error, doc) {
    if(error){
        console.log(error);
    }else{
        console.log(doc[0].nickname);
    }
});
