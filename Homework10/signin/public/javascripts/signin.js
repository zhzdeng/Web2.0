$(function() {
  // $('#error').removeClass('show').addClass('hidden');
  setTimeout(function() {
    $('#error').hide();
  }, 1500);
  $('#submit').click(function(event) {
    if ($('#username').val() === '') showError("用户名不能为空"), event.preventDefault();
    else if ($('#password').val() === '') showError('密码不能为空'), event.preventDefault();
  });
  $('#signup').click(function() {
    window.location.href = "/regist";
  });
  $('#checkimg').click(function(event) {
    $(this).attr('src', '/api/getcap?'+Math.random());
  });
});


function showError(message) {
  // $('#error').removeClass('hidden').addClass('show').find('p').text(message);
  $("#error").show().find('p').text(message);
  setTimeout(function(){
    // $('#error').removeClass('show').addClass('hidden');
    $('#error').hide();
  }, 1500);
}

