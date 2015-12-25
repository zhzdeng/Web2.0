var express = require('express');
var router = express.Router();


// 自动登录
router.get('/', function (req, res) {
  // 收取cookie和M比较
  // 考虑有参数的情况
  if (req.session.user) res.redirect('/detail');
  res.render('signin', {title: '登录'});
  // 比较成功，返回详情页面，不成功就返回登录页面
});

// 返回静态注册页面
router.get('/regist', function (req, res) {
  res.render('signup', {title: '注册'});
});

// 退出登录
router.get('/signout', function (req, res) {
  delete req.session.user;
  res.redirect('/');
});

// 保护detail 不外露
router.all('*', function (req, res, next) {
  req.session.user ? next() : res.redirect('/');
});

// 返回用户详情
router.get('/detail', function (req, res) {
  res.render('detail', {title: '详情', user: req.session.user});
})
module.exports = router;
