$(function() {
  $('#changepassword').click(changepassword);
  $('#submit').click(check);
  $('#quit').click(quit);
});

function quit() {
  $.cookie('userId', null);
  window.location.href = "/";
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
  if ($('#lpasswordagain input').val() != $('#lnewpassword input').val()) {
    event.preventDefault();
    tempshow($('body > p'));
  } else {
    $('input:not(#submit)').val('');
    $.post('/api/changepassword', {oldpassword: $('loldpassword input').val(), newpassword: $('lnewpassword input').val()}, function(data) {
      if (data.status === true) {
        tempshow($('body > p').text('修改成功'));
      } else {
        tempshow($('body > p').text('修改失败，原密码错误'));
      }
    });
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
