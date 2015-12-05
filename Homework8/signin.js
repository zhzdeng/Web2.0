var path = require('path');
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var util = require('util');
var mime = require('./mime').types;
var mydata = [];
var post = '';
var RELATIVEPATH = 'assets';

http.createServer(function (request, response) {
  post = '';
  request.on('data', function (chunk) { post += chunk;});
  if (request.method==="POST") request.on('end', function() {getPost(request, response);});
  else signIn(request, response);
}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');
// 不是提交表单
function signIn(request, response) {
    var query = url.parse(request.url).query;
    if (query === null) {
      // 注册或者获取.css .js文件
      getFs(request, response);
    } else {
      // 判断username是否已经注册
      var queryObject = querystring.parse(query);
      if (judgeSignIn(queryObject)) getSignUp(queryObject, response); // 已注册
      else getFs(request, response); // 未注册
    }
}

// 是提交表单
function getPost(request, response) {

    // 判断提交的表单是否有效
    var postObject = querystring.parse(post);
    var postNmber = judgePost(postObject);
    // 留下拓展功能
    if (postNmber === 0) {
      mydata.push(postObject);
      getSignUp(postObject, response);
    } else {
      var head =   "<!DOCTYPE html>"+
                   "<html lang=\"en\">"+
                   "<head>"+
                   "<meta charset=\"UTF-8\">"+
                   "<title>注册失败</title>"+
                   "<style type=\"text/css\">"+
                   "div {"+
                    "text-align: center;"+
                   "}"+
                   "body {"+
                    " font-family: \"Century Gothic\";"+
                   "}"+
                   "</style>"+
                   "</head>"+
                   "<body>"+
                   "<div>"+
                   "<h2>";
      var end =   "</h2>"+
                  "<input type=\'button\' value=\"返回\" onclick=\"location.href=\'http://localhost:8000/\'\"/>"+
                  "</div>"+
                  "</body>"+
                  "</html>";
      if (postNmber === 1) response.write(head+'用户名重复'+end, 'utf-8');
      else if (postNmber === 2) response.write(head+'学号重复'+end, 'utf-8');
      else if (postNmber === 3) response.write(head+'电话重复'+end, 'utf-8');
      else if (postNmber === 4) response.write(head+'邮箱重复'+end, 'utf-8');
      else response.write(head+'表单格式不对'+end);
      response.end();
    }

}

// 判断表单是否有效
// 0 成功，1 用户名重复， 2 学号重复， 3 电话重复， 4 邮箱重复 5 表单不合规范
function judgePost(postObject) {
  var len = mydata.length;

  for(var i in postObject)
    if (!regJudge(i, postObject[i])) return 5;

  for (var i = 0; i < len; i++) {
    if (postObject['username'] === mydata[i]['username']) return 1;
    if (postObject['studentid'] === mydata[i]['studentid']) return 2;
    if (postObject['phone'] === mydata[i]['phone']) return 3;
    if (postObject['email'] === mydata[i]['email']) return 4;
  }
  return 0;
}



// 动态生成用户详情页面
function getSignUp(queryObject, response) {
  var len = mydata.length;
  for (var i = 0; i < len; i++)
    if (queryObject['username'] === mydata[i]['username']) break;
  response.writeHead(200, {'Content-Type': mime['html']});
  response.write("<!DOCTYPE html>"+
     "<html lang=\"en\">"+
     "<head>"+
     "<meta charset=\"UTF-8\">"+
     "<title>注册成功</title>"+
     "<style type=\"text/css\">"+
     "div p, h2, #backdiv {"+
     "text-align: center;"+
     "}"+
     "body {"+
     " font-family: \"Century Gothic\";"+
     "}"+
     "</style>"+
     "</head>"+
     "<body>"+
     "<h2>用户详情</h2>"+
      "<div><p>姓名："+ mydata[i]['username'] +"</p></div><br />"+
      "<div><p>学号："+ mydata[i]['studentid'] +"</p></div><br />"+
      "<div><p>电话："+ mydata[i]['phone'] +"</p></div><br />"+
      "<div><p>邮箱："+ mydata[i]['email'] +"</p></div><br />"+
      "<div id='backdiv'>"+
      "<input id=\'back\' type='button' value=\"返回\" onclick=\"location.href=\'http://localhost:8000/\'\"/>"+
      "</div>"+
    "</body>"+
    "</html>"
    );
  response.end();
}


// 判断URL中得username是否已注册
function judgeSignIn(queryObject) {
  if (typeof(queryObject['username']) === 'undefined') return false;

  var len = mydata.length;
  for (var i = 0; i < len; i++) {
    if (queryObject['username'] === mydata[i]['username']) return true;
  }
  return false;
}



// 获取.html .css .js文件
function getFs(request, response) {
  var pathname = url.parse(request.url).pathname;
  if (pathname === '/') pathname = '/index.html';

  var realPath = RELATIVEPATH + pathname;
  // 获取后缀名,含.
  var ext = path.extname(pathname);
  // 去掉。
  ext = ext ? ext.substr(1) : 'unknown';

  fs.readFile(realPath, function (err, data) {
    if (err) {
      response.writeHead(404, {'Content-Type': mime['html']});
      fs.readFile(RELATIVEPATH+'/404.html', 'utf-8' ,function (err, data) {
        response.end(data);
      });
    } else {
      response.writeHead(200, {'Content-Type': mime[ext]});
      response.write(data);
      response.end();
    }
  });
}

// 表单规范检查
function regJudge(name, val) {
  regUserName = /^[a-zA-Z]\w{5,17}$/;
  regStudentId = /^[1-9]\d{7}$/;
  regPhone = /^[1-9]\d{10}$/;
  regEmail = /^[a-zA-Z_\-0-9]+@(([a-zA-Z_\-0-9])+\.)+[a-zA-Z0-9]{2,4}$/;

  if (name === 'username') return regUserName.test(val);
  else if (name === 'studentid') return regStudentId.test(val);
  else if (name === 'phone') return regPhone.test(val);
  else return regEmail.test(val);
}
