window.onload = function() {
  var start = document.getElementById('start');
  var timeText = document.getElementById('time');
  var scoreText = document.getElementById('score');
  var palystatus = document.getElementById('result');
  var gameArea = document.getElementById('gameArea');
  var startStatus = true;
  var score = 0;
  var click = 30; //每秒时钟
  var mole = -1; //地鼠所在的按钮
  var buttonArray = [0];
  for (var i = 1; i < 61; i++) {
    buttonArray[i] = document.getElementById('b' + i);
    buttonArray[i].onclick = judge;
  }

  palystatus.value = "Game Over";
  start.onclick = function() {
    if (startStatus) {
      if (mole == -1) {
        // 表明刚刚开始游戏，不为-1这是从暂停中回到游戏
        mole = getrandom();
        buttonArray[mole].className = "focus";  // 第一只地鼠出现
        score = 0;
        click = 30;
        scoreText.value = score;
      }
      // gameArea.className = "playingMouse";
      begin();
      startStatus = false;
    } else {
      stop();
      startStatus = true;
    }
  }

  function begin() {
    timeClick();
    eachClick = setInterval(timeClick, 1000);
    // 生成地鼠

    palystatus.value = "Playing";
  }

  function stop() {
    // 暂停函数
    // gameArea.className = "gameoverMouse";
    palystatus.value = "Game Stop";
    clearInterval(eachClick);
  }

  function end() {
    stop();
    // 地鼠消失，弹出成绩
    buttonArray[mole].className = "blur";
    mole = -1;
    startStatus = true;
    palystatus.value = "Game Over";
    var result = "Game Over\nYour score is: " + score;
    alert(result);
  }

  function timeClick() {
    // 每秒流逝时间并显示
    timeText.value = click;
    if (click == 0) end();
    click--;
  }

  function judge(event) {
    // 判断单击是否为地鼠
    // 判断是否处于暂停中
    if (startStatus) return;
    if (event.target.id == 'b' + mole) {
      // 点击正确
      score++;
      buttonArray[mole].className = "blur";
      mole = getrandom();
      buttonArray[mole].className = "focus";  // 另外地鼠出现
    } else {
      score--;
    }
    // 显示成绩
    scoreText.value = score;
  }


  function getrandom() {
    return parseInt(Math.random() * 60 + 1);
  }


}
