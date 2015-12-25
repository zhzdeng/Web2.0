var express = require('express');
var router = express.Router();

// 唯一性校验
router.post('/validate-unique', function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({isUnique: true}));
});

// 改密码
router.post('/changepassword', function(req, res) {

});

// 注册表单提交
router.post('/regist', function(req, res) {
  var user = req.body;
  req.session.user = user;
  res.redirect('/detail');
});

// 登录表单提交
router.post('/signin', function(req, res) {
  var user = req.body;
  console.log(req.session);
  if (req.session.user&&user.username == req.session.user.username&&user.password == req.session.user.password)
      res.redirect('/detail');
  else res.redirect('/');
});

module.exports = router;
