var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:router');
var url = require('url');
var querystring = require('querystring');
module.exports = function (db) {
  var userManager = require('../myModels/userManager')(db);
  var errorMessage = '';

  // 登录表单提交
  router.post('/signin', function(req, res) {
    userManager.findUser(req.body.username, req.body.password)
      .then(function (user) {
        req.session.user = user;
        res.redirect('/detail');
      })
      .catch(function (error) {
        res.render('signin', {title: '登录', error: '用户名或密码错误'});
      });
  });


  // 注册表单提交
  router.post('/regist', function(req, res) {
    var user = req.body;
    userManager.checkUser(user)
      .then(function (user) { userManager.createUser(user); })
      .then(function () {
        req.session.user = user;
        res.redirect('/detail');
      })
      .catch(function (error) {
        res.render('signup', {title: '注册', user: req.body});
      });

  });

  // 自动登录
  router.get('/', function (req, res) {
    var queryObject = querystring.parse(url.parse(req.url).query);
    if (typeof queryObject.username !== 'undefined'&&queryObject.username != req.session.user.username)
      errorMessage = '只能够访问自己的数据';
    else errorMessage = '';
    if (req.session.user) res.redirect('/detail');
    else res.render('signin', {title: '登录', error: ''});
  });

  // 返回静态注册页面
  router.get('/regist', function (req, res) {
    res.render('signup', {title: '注册', user: {}});
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
    res.render('detail', {title: '详情', user: req.session.user, error: errorMessage});
  });

  return router;
};
