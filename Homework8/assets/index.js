$(function() {
  $('input[name=username]').focus();
});


// 失去焦点时进行检测是否符合要求
$("label input").blur(function(event) {
  var target = event.target;
  var name = $(target).attr('name');
  if (regJudge(name, $(target).val())) $(target).attr('class', 'corrent');
  else {
    $(target).attr('class', 'error');
    displayError(name);
  }
});

// 提示错误信息
function displayError(name) {
  if (name === 'username') $('#notice p').html('用户名6~18位英文字母、数字或下划线，必须以英文字母开头');
  else if (name === 'studentid') $('#notice p').html('学号8位数字，不能以0开头');
  else if (name === 'phone') $('#notice p').html('电话11位数字，不能以0开头');
}

// 阻止不合法的提交
$('form').submit(function(e) {
  var len = $('label input').length;
  for (var i = 0; i < len; i++)
    if ($($('label input')[i]).attr('class') !== 'corrent') {
      e.preventDefault();
      break;
    }
})

// 去除颜色提示
$('#reset').click(function() {
  $('label input').attr('class', '');
});

// 正则表达式错误返回false
function regJudge(name, val) {
  regUserName = /^[a-zA-Z]\w{5,17}$/;
  regStudentId = /^[1-9]\d{7}$/;
  regPhone = /^[1-9]\d{10}$/;
  regEmail = /^[a-zA-Z_\-0-9]+@(([a-zA-Z_\-0-9])+\.)+[a-zA-Z]{2,4}$/;

  if (name === 'username') return regUserName.test(val);
  else if (name === 'studentid') return regStudentId.test(val);
  else if (name === 'phone') return regPhone.test(val);
  else return regEmail.test(val);
}

$('#reset').click(function() {
  $('#notice p').html('');
});


