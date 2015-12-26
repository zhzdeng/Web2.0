$(function() {
  $('#changepassword').click(changepassword);
  $('#submit').click(check);
  $('#quit').click(quit);
  $('#lnewpassword input').blur(function () {
    if (!validator.isPasswordValid($(this).val()))
      tempshow($('body > p').text('密码为6~12位数字、大小写字母、中划线、下划线'));

  });
  $('#lpasswordagain input').blur(function () {
    if ($('#lpasswordagain input').val() != $('#lnewpassword input').val())
      tempshow($('body > p').text('两次密码不一致'));
  });
  setTimeout(function() {
    hidden($('#error'));
  }, 1300);
});

function quit() {
  window.location.href = "/signout";
}

function changepassword() {
  if ($(this).text() === '修改密码') {
    display($('#changepasswordblock'));
    $(this).text('隐藏');
    $('input:not(#submit)').val('');
  } else {
    hidden($('#changepasswordblock, body > p'));
    $(this).text('修改密码');
  }
}

function check(event) {
  if ($('#lpasswordagain input').val() != $('#lnewpassword input').val()||!validator.isPasswordValid($('#lnewpassword input').val())) {
    event.preventDefault();
  } else {
    $.post('/api/changepassword', {oldpassword: $('#loldpassword input').val(), newpassword: $('#lnewpassword input').val()}, function(data) {
      if (data.status === true) {
        tempshow($('body > p').text('修改成功'));
      } else {
        tempshow($('body > p').text('修改失败，原密码错误'));
      }
    });
    $('input:not(#submit)').val('');
  }
}

function tempshow(jqobject) {
    display(jqobject);
    setTimeout(function() {
      hidden(jqobject);
    }, 2000);
}

function hidden(jqobject) {
  jqobject.removeClass('show').addClass('hidden');
}

function display(jqobject) {
  jqobject.removeClass('hidden').addClass('show');
}
