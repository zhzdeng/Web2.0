window.onload = function() {

var map = [];
var move = [[1, 0], [0, 1], [0, -1], [-1, 0]]; // y x
var stack = [];
var current = [3, 3]; // 记录第15块拼图的当前位置 列y， 行x
var gameArea = document.getElementById('gameArea');
var puzzles = []; // 拼图元素 0 ~ 15;
var startTime = new Date();
var clearTime;
var backgroundImgNumber = 0;
var backgroundImg = [' panda', ' spongebob', ' minions', ' doraemon'];
createPuzzle();
  // 创建拼图碎片

document.getElementById('restart').onclick = restart;
for (var i = 0; i < 16; i++) {
  puzzles[i].onclick = click;
}

document.getElementById('changeimg').onclick = function() {
  backgroundImgNumber = (backgroundImgNumber + 1) % 4;
  reset(backgroundImgNumber);
}

document.getElementById('finish').onclick = function() {
  clearTime = setInterval(finish, 300);
}

document.getElementById('tip').onclick = function() {
  if (stack.length !== 0) {
    var next = stack.pop();
    var object = {0: current[0] + move[next][0], 1: current[1] + move[next][1]};
    change(current, object);
    current[0] =  object[0];
    current[1] = object[1];
  }
  if (isfinish()) {
  var endTime = new Date();
  var duringTime = endTime - startTime;
  var string = "经过" + (duringTime / 1000) + "秒后完成";
  alert(string);
  }
}

function finish() {
  if (stack.length !== 0) {
    var next = stack.pop();
    var object = {0: current[0] + move[next][0], 1: current[1] + move[next][1]};
    change(current, object);
    current[0] =  object[0];
    current[1] = object[1];
  } else {
    clearInterval(clearTime);
  }
}

function click(event) {
  // 点击拼图产生一个移动
  var idName = event.target.className;
  //  object被点击拼图的坐标
  var object = {0:idName[10] - 1, 1:idName[18] - 1};

  if (isAdjacent(current, object)) {
    var direction = moveDirection(current, object);
    if (stack[stack.lenght - 1] === direction) stack.pop();
    else stack.push(3 - direction);
    change(current, object);
    current[0] = object[0];
    current[1] = object[1];
    // 插入到栈中
    if (isfinish()) {
      var endTime = new Date();
      var duringTime = endTime - startTime;
      var string = "经过" + (duringTime / 1000) + "秒后完成";
      alert(string);
    }
  }
}

function moveDirection(current, object) {
  // 空缺拼图要移动的方向
  if (current[0] - object[0] === 1) return 3;
  else if (current[0] - object[0] === -1) return 0;
  else if (current[1] - object[1] === 1) return 2;
  else return 1;
}

function isfinish() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (map[i][j] !== i * 4 + j) return false;
    }
  }
  return true;
}

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
  gameArea.appendChild(frag);
}

function restart() {
  reset(backgroundImgNumber);
  simulation();
  startTime = new Date();
}

function simulation() {
  var before = 3;
  for (var i = 0; i < 100; i++) {
    var next = getRandom();
    var movex = move[next][1] + current[1];
    var movey = move[next][0] + current[0];
    if (movex < 0||movey < 0||movex > 3||movey > 3||next === 3 - before) {
      i--;
      continue;
    }
    before = next;
    change(current, {0:movey, 1:movex});
    current[0] = movey;
    current[1] = movex;
    stack.push(3 - next);
  }
}

function reset(number) {
  // 回到原点
  map = [];
    for (var i = 1; i <= 4; i++) {
    for (var j = 1; j <= 4; j++) {
        puzzles[i * 4 + j - 5].className = "puzzle " + "row" + i + " column" + j + backgroundImg[number];
    }
  }
  puzzles[15].className += ' hidden';
  stack = [];
  for (var i = 0; i < 4; i++) {
    var submap = [];
    for (var j = 0; j < 4; j++) {
      submap.push(i * 4 + j);
    }
    map.push(submap);
  }

  current = [3, 3]; // y ,x
  startTime = new Date();
}

function getRandom() {
  return parseInt(Math.random() * 4);
  // 返回0, 1, 2, 3中一个;
}

function change(current, next) {
  var missNumber = map[current[0]][current[1]];
  var totalNumber = map[next[0]][next[1]];
  map[current[0]][current[1]] = totalNumber;
  map[next[0]][next[1]] = missNumber;

  puzzles[missNumber].className = "puzzle " + "row" + (next[0] + 1) + " column" + (next[1] + 1) + backgroundImg[backgroundImgNumber];
  puzzles[totalNumber].className = "puzzle " + "row" + (current[0] + 1) + " column" + (current[1] + 1) + backgroundImg[backgroundImgNumber];
  puzzles[missNumber].className += ' hidden';
}

}
