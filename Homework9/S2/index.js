var robot = false;


$(document).ready(function() {
  $('#button').hover(hoverEvent);
  $('ul li').click(clickEvent);
  $('#info-bar div').click(clickSum);
  $('.after-icon').click(robotStart);
});

function robotStart() {
  robot = true;
  $('.mask').click();
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

// 点击事件
function clickEvent(event) {
  if ($(this).hasClass('active')&&$(this).find('span').html() !== '...') {
    var title = $(this).attr('title');
    display($(this).find('span').html('...'));
    disable($('ul li[title!=\''+title+'\']'));
    $.get('/', (function(target) {
      var jqObject = target;
      return function setValue(data) {
                jqObject.find('span').html(data);
                active(findUnSet());
                disable(jqObject);
                if (findUnSet().length === 0) active($('.info'));
                if (robot) {
                  if (findUnSet().length !== 0) findUnSet().click();
                  else $('.info').click();
                }
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


