window.onload = function() {
  var result = [false, false, false];
  var start = document.getElementById('start');
  var maze = document.getElementById('maze');
  var judge = document.getElementById('judge');
  var end = document.getElementById('end');
  var text = document.getElementById('result');
  var border = document.getElementsByClassName('border');

    // 防止穿墙进入开始
    start.onmouseover = function() {
      maze.className = "palygame";
      result[0] = true;
      text.className = "textStart";
      text.textContent = ".";
    }

  judge.onmouseover = function() {
    // 中途检验
    result[1] = true;
  }

  maze.onmouseout = function(event) {
    // 防止经过中途检验后返回
    if(event.target.id == "start")
      result[1] = false;
  }

  end.onmouseover = function() {
    // 到达终点后判断是否作弊
    if (result[0]&&result[1]) {
      text.textContent = "You Win";
    }
    else if (result[0]&&!result[1]) {
      text.textContent = "Don't cheat,you should start form the 's' and move to the 'E' inside the maze!";
    }
    result = [false, false, false];
    text.className = "text";
  }

  for (var i = 0; i < border.length; i++) {
    border[i].onmouseover = function(event) {
      // 开始游戏后碰到墙
      if (result[0] == true) {
        result = [false, false, false];
        maze.className = "gameover";
        event.target.className = "touchborder";
        text.textContent = "You Lose";
        text.className = "text";
      }
    }
    // 离开墙后恢复颜色
    border[i].onmouseout = function(event) {
      event.target.className = "border";
    }

  }
}
