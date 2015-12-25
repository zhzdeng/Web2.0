$(function() {
  $('#username, #passwordagain, #sid, #phone, #email, #password').blur(check);
  $('#submit').click(submit);
  $('#reset').click(reset);
  $('#login').click(function() {
    window.location.href = "/";
  });
});

function check() {
  self = this;
  if (self.name === 'passwordagain') {
    if (!validator.isPasswordagainValid($('#password').val(), $('#passwordagain').val()))
      showError('passwordagain', '两次密码不相同');
    else hidden($('#errorpasswordagain'));
  } else {
    if (validator.isFieldValid(self.name, $(self).val())) {
      hidden($('#error'+self.name));
      if (self.name === 'password') return;
      $.post('/api/validate-unique', {field: this.name, value: $(this).val() }, function(data, status){
        if (status == 'success') {
          if (!data.isUnique) {
            showError(self.name, '以被注册');
            validator.form[self.name].status = false;
          } else {
            $('#'+self.name).addClass('corrent');
            hidden($('#error'+self.name));
          }
        }
      });
    } else {
      showError(self.name, validator.form[self.name].errorMessage);
    }
  }
}

function submit(event) {
  $('#username, #passwordagain, #sid, #phone, #email, #password').blur();
  if (!validator.isFormValid()) event.preventDefault();
}

function reset() {
  hidden($('#error p'));
}

function showError(string, message) {
  display($('#error'+string).text(message));
  $(string).removeClass('corrent');
}

function hidden(jqobject) {
  jqobject.removeClass('show').addClass('hidden');
}

function display(jqobject) {
  jqobject.removeClass('hidden').addClass('show');
}
