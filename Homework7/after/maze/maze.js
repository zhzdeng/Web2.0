var result = [false, false, false];
// 防止穿墙进入开始
$("#start").mouseover(function(){
  $("#maze").attr("class", "palygame");
  result[0] = true;
  $("#result").attr("class", "textStart").text(".");
});

// 中途检验
$("#judge").mouseenter(function() {
  result[1] = true;
});

// 防止经过中途检验后返回
$("#maze").mouseout(function(event) {
  if(event.target.id == "start")
    result[1] = false;
});

// 到达终点后判断是否作弊
$("#end").mouseover(function() {
  if (result[0]&&result[1]) $("#result").text("You Win");
  else if (!result[1]) $("#result").text("Don't cheat,you should start form the 's' and move to the 'E' inside the maze!");
  result = [false, false, false];
  $("#result").attr("class", "text");
});

// 开始游戏后碰到墙
$(".border").mouseover(function(event) {
  if (result[0] == true) {
    result = [false, false, false];
    $("#maze").attr("class", "gameover");
    event.target.className = "touchborder";
    $("#result").text("You Lose");
    $("#result").attr("class", "text");
  }
});

// 离开墙后恢复颜色
$(".border").mouseout(function(event) {
    event.target.className = "border";
});
