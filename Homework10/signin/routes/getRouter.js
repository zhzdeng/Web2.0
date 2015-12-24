var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // 收取cookie和M比较
  // 考虑有参数的情况
  console.log("Cookies: ", req.cookies);
  res.render('signin')
  // 比较成功，返回详情页面，不成功就返回登录页面
});

router.get('/regist', function(req, res) {
  // 返回静态注册页面
  res.render('signup');
});

module.exports = router;
