var startStatus = true;
var score = 0;
var click = 30; //每秒时钟
var mole = -1; //地鼠所在的按钮下标
var buttonArray = [0];
$("#result").val("Game Over");

for (var i = 1; i < 61; i++) {
  buttonArray[i] = document.getElementById('b' + i);
  buttonArray[i].onclick = judge;
}

$("#start").click(function() {
  if (startStatus) {
    if (mole === -1) firstStart();
    begin();
    startStatus = false;
  } else {
    stop();
    startStatus = true;
  }
});

// 游戏刚开始
function firstStart() {
  mole = _.random(1, 60);
  buttonArray[mole].className = "focus";  // 第一只地鼠出现
  score = 0;
  click = 30;
  $("#score").val(score);
}

function begin() {
  timeClick();
  eachClick = setInterval(timeClick, 1000);
  $("#result").val("Playing");
}

// 暂停函数
function stop() {
  $("#result").val("Game Stop");
  clearInterval(eachClick);
}

// 每秒流逝时间并显示
function timeClick() {
  $("#time").val(click);
  if (click === 0) end();
  if (click > 0) click--;
}

// 地鼠消失，弹出成绩
function end() {
  stop();
  buttonArray[mole].className = "blur";
  mole = -1;
  startStatus = true;
  $("#result").val("Game Over");
  alert("Game Over\nYour score is: " + score);
}

function judge(event) {
  // 判断是否处于暂停中
  if (startStatus) return;
  if (event.target.id === 'b' + mole) {
    // 点击正确
    score++;
    buttonArray[mole].className = "blur";
    mole = _.random(1, 60);
    buttonArray[mole].className = "focus";  // 另外地鼠出现
  } else {
    score--;
  }
  // 显示成绩
  $("#score").val(score);
}

