var robot = false;

$(document).ready(function() {
  $('#button').hover(hoverEvent);
  $('ul li').click(clickEvent);
  $('#info-bar div').click(clickSum);
  $('.after-icon').click(robotStart);
});

function robotStart() {
  robot = true;
  $('.history').click();
  $('.mask').click();
  $('.message').click();
  $('.setting').click();
  $('.sign').click();
}


function clickSum() {
  console.log('clickSum');
  if ($('.info').hasClass('active')) {
    var sum = 0, len = $('ul li span').length;
    for (var i = 0; i < len; i++) {
      sum += parseInt($($('ul li span')[i]).html());
    }
    $('.sum').html(sum);
    display($('.sum'));
    disable($('.info'));
  }
}

// 打开计算器
function hoverEvent() {
  init();
}

// 是否可以点击
function judgeClick(jqObject, callback) {
  if (jqObject.hasClass('active')&&jqObject.find('span').html() !== '...')
    callback(null, jqObject);
}


// 点击事件
function clickEvent(event) {
  if (robot&&$(this).hasClass('active')&&$(this).find('span').html() !== '...') {
    display($(this).find('span').html('...'));
    $.get('/', (function(target) {
      var jqObject = target;
      return function setValue(data) {
                jqObject.find('span').html(data);
                active(findUnSet());
                disable(jqObject);
                var title = jqObject.attr('title');
                if (findUnSet().length === 0) active($('.info')), $('.info').click();
              };
    })($(this)));
  }
}

function findUnSet() {
  return $('li .hidden').parent();
}


function disable(jqObject) {
  jqObject.addClass('disable').removeClass('active');
}

function active(jqObject) {
  jqObject.addClass('active').removeClass('disable');
}

function display(jqObject) {
  jqObject.addClass('display').removeClass('hidden');
}

function hidden(jqObject) {
  jqObject.addClass('hidden').removeClass('display');
}

// 初始化计算器 红圆圈隐藏,数字清零 ，按钮激活
function init() {
  $('.mask, .history, .message, .setting, .sign').addClass('active').removeClass('disable');
  disable($('.info'));
  $('ul span').addClass('hidden').removeClass('display').html('');
  robot = false;
}


