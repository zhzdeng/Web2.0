$(document).ready(function() {
  $('#button').hover(hoverEvent);
  // $('.mask').click(aHandler);
  // $('.history').click(bHandler);
  // $('.message').click(cHandler);
  // $('.setting').click(dHandler);
  // $('.sign').click(eHandler);
  // $('#info-bar div').click(bubbleHandler);
  $('.after-icon').click(robotStart);
});

function robotStart() {
  var order = getOrder();
  showOrder(order);

  var functionName = [aHandler, bHandler, cHandler, dHandler, eHandler];
  var callbacks = [];
  for (var i = 0; i < 5; i++) {
    (function(i) {
      callbacks[i] = function(message, currentSum) {
        console.log(message + "  " + currentSum);
        functionName[order[i]](message, currentSum, callbacks[i + 1]);
      };
    })(i);
  }
  callbacks[5] = bubbleHandler;
  try {
    callbacks[0]('谁能当我', 0);
  } catch(err) {
    callbacks[0]('谁能当我', 0);
  }

}

function getOrder() {
  var order = [];
  for (var i = 0; i < 5; i++) {
    var getNumber = getRandom(5);
    while (order[getNumber] != undefined) getNumber = (getNumber + 1) % 5;
    order[getNumber] = i;
  }
  return order;
}

function showOrder(order) {
  var result = '';
  var list = ['A', 'B', 'C', 'D', 'E'];
  for (var i = 0; i < 4; i++) {
    result += list[order[i]] + ',';
  }
  result += list[order[i]];
  $('.info p').html(result);
}

function getRandom(range) {
  return parseInt(Math.random() * range);
}


// 打开计算器
function hoverEvent() {
  init();
}

// 点击事件
// function clickEvent(event) {
//   if ($(this).hasClass('active')&&$(this).find('span').html() !== '...') {
//     var title = $(this).attr('title');
//     display($(this).find('span').html('...'));
//     disable($('ul li[title!=\''+title+'\']'));
//     $.get('/', (function(target) {
//       var jqObject = target;
//       return function setValue(data) {
//                 jqObject.find('span').html(data);
//                 active(findUnSet());
//                 disable(jqObject);
//                 var title = jqObject.attr('title');
//                 if (findUnSet().length === 0) active($('.info')), $('.info').click();
//                 if (order.length === 0) $('.info').click();
//                 else $('li:nth-child('+(order[0] + 1)+')').click(), order.shift();
//               };
//     })($(this)));
//   }
// }

function aHandler(message, currentSum, callback) {
  var correctMessage = ['这是一个天大的秘密', '我不知道', '你不知道', '他不知道', '才怪'];
  display($('.mask span').html('...'));
  if (getRandom(4) === 0) throw new Error("这不是一个天大的秘密");
  showMessage('这是一个天大的秘密');
  $.get('/', function(data) {
    disable($('.mask'));
    $('.mask span').html(data);
    try {
      callback('这是一个天大的秘密', currentSum + parseInt(data));
    } catch (err) {
      callback('这是一个天大的秘密', currentSum + parseInt(data));
    }
  });
}

function bHandler(message, currentSum, callback) {
  var correctMessage = ['这是一个天大的秘密', '我不知道', '你不知道', '他不知道', '才怪'];
  display($('.history span').html('...'));
  if (getRandom(4) === 0) throw new Error("我知道");
  showMessage('我不知道');
  $.get('/', function(data) {
    disable($('.history'));
    $('.history span').html(data);
    try {
      callback('我不知道', currentSum + parseInt(data));
    } catch (err) {
      callback('我不知道', currentSum + parseInt(data));
    }
  });
}

function cHandler(message, currentSum, callback) {
  var correctMessage = ['这是一个天大的秘密', '我不知道', '你不知道', '他不知道', '才怪'];
  display($('.message span').html('...'));
  if (getRandom(4) === 0) throw new Error("你知道");
  showMessage('你不知道');
  $.get('/', function(data) {
    disable($('.message'));
    $('.message span').html(data);
    try {
      callback('你不知道', currentSum + parseInt(data));
    } catch (err) {
      callback('你不知道', currentSum + parseInt(data));
    }
  });
}

function dHandler(message, currentSum, callback) {
  var correctMessage = ['这是一个天大的秘密', '我不知道', '你不知道', '他不知道', '才怪'];
  display($('.setting span').html('...'));
  if (getRandom(4) === 0) throw new Error("他知道");
  showMessage('他不知道');
  $.get('/', function(data) {
    disable($('.setting'));
    $('.setting span').html(data);
    try {
      callback('他不知道', currentSum + parseInt(data));
    } catch (err) {
      callback('他不知道', currentSum + parseInt(data));
    }
  });
}

function eHandler(message, currentSum, callback) {
  var correctMessage = ['这是一个天大的秘密', '我不知道', '你不知道', '他不知道', '才怪'];
  display($('.sign span').html('...'));
  if (getRandom(4) === 0) throw new Error("呵呵");
  showMessage('才怪');
  $.get('/', function(data) {
    disable($('.sign'));
    $('.sign span').html(data);
    try {
      callback('才怪', currentSum + parseInt(data));
    } catch (err) {
      callback('才怪', currentSum + parseInt(data));
    }
  });
}

function bubbleHandler(message, currentSum) {
  showMessage('楼主异步调用战斗力感人，目测不超过' + parseInt(currentSum));
  display($('.sum').html(currentSum));
}

function findUnSet() {
  return $('li .hidden').parent();
}


function showMessage(message) {
  $("#info-bar > p").html(message).addClass('display').removeClass('hidden');
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
  $('ul span, #info-bar > p').addClass('hidden').removeClass('display').html('');
  $('.info p').html('');
}


