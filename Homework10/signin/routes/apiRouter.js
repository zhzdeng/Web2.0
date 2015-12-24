var express = require('express');
var router = express.Router();

router.post('/api/validate-unique', function(req, res) {
  var chunk = '';
  req.on('data', function (temp) {
    chunk += temp;
  });
  req.on('end', function() {
    var params = chunk.toString().match(/field=(.+)&value=(.+)/);
    var user = {};
    user[field = params[1]] = decodeURIComponent(params[2]);
    // 从数据库中查找数据 user

    var result = {isUnique: true};
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify(result));
  });
});

router.post('/api/changepassword', function(req, res) {
  var chunk = '';
  req.on('data', function(temp) {
    chunk += temp;
  });
  req.on('end', function() {
    // 不确定
    var params = chunk.toString().match(/old=(.+)&new=(.+)/);
    // 通过cookie找到用户，并比对原密码，修改新密码
    passwordObject = {oldpassword: parames[1], newpassword: decodeURIComponent(params[2])};
  });
});

router.post('/api/regist', function(req, res) {
  var chunk = '';
  req.on('data', function(temp) {
    chunk += temp;
  });
  req.on('end', function() {
    try {
      var user = parseUser(chunk.toString());
      checkUser(user);
      users[user.username] = user;
      res.writeHead(301, {Location: '?username=' + user.username});
      // 派一个cookie给它
      res.cookie();
      res.end();
    } catch (error) {

    }
  });
});

function parseUser(message){
  params = message.match(/username=(.+)&password=(.+)&passwordagain=(.+)&sid=(.+)&phone=(.+)&email=(.+)/);
  var user = {username: params[1], password: params[2], passwordagain: params[3], sid: params[4], phone: params[5], email: decodeURIComponent(params[6])};
  console.log("user parsed is: ", user);
  return user;
}

function checkUser(user) {
  throw new Error();
}

module.exports = router;
