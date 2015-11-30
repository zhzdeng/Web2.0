var map = [];
var move = [[1, 0], [0, 1], [0, -1], [-1, 0]]; // y x
var stack = [];
var current = [3, 3]; // 记录第15块拼图的当前位置 列y， 行x
var puzzles = []; // 拼图元素 0 ~ 15;
var startTime = new Date();
var backgroundImgNumber = 0;
var backgroundImg = [' panda', ' spongebob', ' minions', ' doraemon'];
createPuzzle();
  // 创建拼图碎片
$("#restart").click(restart);
_.times(15, function(i) {puzzles[i].onclick = click;});

$("#changeimg").click(function() {
  backgroundImgNumber = (backgroundImgNumber + 1) % 4;
  reset(backgroundImgNumber);
});

$("#finish").click(function() {
  clearTime = setInterval(finish, 300);
});

$("#tip").click(function() {
  if (stack.length !== 0) {
    var next = stack.pop();
    var object = {0: current[0] + move[next][0], 1: current[1] + move[next][1]};
    change(current, object);
    current[0] =  object[0], current[1] = object[1];
  }
  if (isfinish()) showResult();
});

// 显示成绩
function showResult() {
  var endTime = new Date();
  var duringTime = endTime - startTime;
  alert("经过" + (duringTime / 1000) + "秒后完成");
}

// 一键复原函数
function finish() {
  if (stack.length !== 0) {
    var next = stack.pop();
    var object = {0: current[0] + move[next][0], 1: current[1] + move[next][1]};
    change(current, object);
    current[0] =  object[0], current[1] = object[1];
  } else {
    clearInterval(clearTime);
  }
}

// 点击正确拼图产生一个移动
function click(event) {
  //  object被点击拼图的坐标
  var idName = event.target.className;
  var object = {0:idName[10] - 1, 1:idName[18] - 1};
  // 判断移动是否合法
  if (isAdjacent(current, object)) {
    var direction = moveDirection(current, object);
    if (stack[stack.lenght - 1] === direction) stack.pop();
    else stack.push(3 - direction);
    change(current, object);
    // 更新空白拼图的坐标
    current[0] = object[0], current[1] = object[1];
    if (isfinish()) showResult();
  }
}

// 空缺拼图要移动的方向
function moveDirection(current, object) {
  if (current[0] - object[0] === 1) return 3;
  else if (current[0] - object[0] === -1) return 0;
  else if (current[1] - object[1] === 1) return 2;
  else return 1;
}

// 判断是否完成拼图
function isfinish() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (map[i][j] !== i * 4 + j) return false;
    }
  }
  return true;
}

// 判断object是否在空白拼图周边
function isAdjacent(current, object) {
  if (Math.abs(current[0] - object[0]) == 1&&current[1] == object[1]) return true;
  if (current[0] == object[0]&&Math.abs(current[1] - object[1]) == 1) return true;
  return false;
}

function createPuzzle() {
  var frag = document.createDocumentFragment();
  for (var i = 1; i <= 4; i++) {  // row
    for (var j = 1; j <= 4; j++) {  // column
      var puzzle = document.createElement('div');
      puzzle.className = "puzzle " + "row" + i + " column" + j + backgroundImg[0];
      puzzle.id = "r" + i + 'c' + j;
      frag.appendChild(puzzle);
      puzzles.push(puzzle);
    }
  }
  puzzles[15].className += ' hidden';
  $("#gameArea").append(frag);
}

// 按下重新开始函数
function restart() {
  reset(backgroundImgNumber);
  simulation();
  startTime = new Date();
}

// 模拟打乱
function simulation() {
  var before = 3;
  for (var i = 0; i < 100; i++) {
    var next = _.random(0, 3);
    var movex = move[next][1] + current[1];
    var movey = move[next][0] + current[0];
    if (movex < 0||movey < 0||movex > 3||movey > 3||next === 3 - before) {
      i--;
      continue;
    }
    before = next;
    change(current, {0:movey, 1:movex});
    current[0] = movey, current[1] = movex;
    stack.push(3 - next);
  }
}

// 回到原点reset number为第几张图片
function reset(number) {
  map = [];
  _.times(4, function(i) {
      _.times(4, function(j) {puzzles[i * 4 + j].className =  "puzzle " + "row" + (i+1) + " column" + (j+1) + backgroundImg[number];});
  });
  puzzles[15].className += ' hidden';
  stack = [];
  map = _.chunk([0, 1, 2, 3, 4, 5 ,6 ,7, 8, 9, 10, 11, 12, 13, 14, 15], 4);
  current = [3, 3]; // y ,x
  startTime = new Date();
}

// 移动图片函数
function change(current, next) {
  var missNumber = map[current[0]][current[1]];
  var totalNumber = map[next[0]][next[1]];
  map[current[0]][current[1]] = totalNumber;
  map[next[0]][next[1]] = missNumber;

  puzzles[missNumber].className = "puzzle " + "row" + (next[0] + 1) + " column" + (next[1] + 1) + backgroundImg[backgroundImgNumber];
  puzzles[totalNumber].className = "puzzle " + "row" + (current[0] + 1) + " column" + (current[1] + 1) + backgroundImg[backgroundImgNumber];
  puzzles[missNumber].className += ' hidden';
}

