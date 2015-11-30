calculator
  优化前LoC：163行
  优化后LoC: 72行
心得：
  有了JQ，再也不用把所有代码写在window.onload里面了，不用再关注一些底层的东西，能更
  专心去写主要的逻辑代码。

maze
  优化前LoC：59行
  优化后LoC：43行
心得：
   Chain Method真的很好用，可以连续对一个元素进行不同的操作

mole
  优化前LoC: 91行
  优化后LoC：76行
心得：
  JQ是对获取DOM对象和修改DOM对象有非常好的支持，但是对JS中语法功能的扩展它就力不从心了
  需要另外的框架来实现

puzzle
  优化前LoC: 181行
  优化后LoC: 158行
心得：
  拼图游戏中，最重要的不是获取和修改DOM对象，而是实现逻辑，比如要如何打乱，如何还原等等，
  这些都不是JQ的侧重点，所以代码行数没什么减少到




网站
http://soj.sysu.edu.cn/courses.php
http://soj.sysu.edu.cn/contests.php
http://soj.sysu.edu.cn/ranklist.php
http://espn.go.com/college-football/team/_/id/228
http://espn.go.com/college-football/team/_/id/333



神秘代码

var isAscend = function isAscend() {
  var isascend = false;
  return function change() {
    isascend = !isascend;
    return isascend;
  }
}();
$("thead th").click(sorter);
$("thead td").click(sorter);
array = new Array();

function sorter() {
  var that = this;
  var index = getTable(that);
  if (isAscend()) ascendSort(index);
  else descendSort(index);
  display(that);
}
function getTable(that) {
  var table = $(that).parents("table").children("tbody").children("tr");
  var len = table.length;
  for (var i = 0; i < len; i++) {
    var trNumber = table.eq(i).children().length;
    var temp = [];
    for (var j = 0; j < trNumber; j++) {
      temp[j] = table[i].children[j].innerHTML;
    }
    array[i] = temp;
  }
  return $(that).index();
}

function ascendSort(index) {
  array.sort(function(a, b) {
    if (isNaN(a)||isNaN(b)) {
      if (a[index] > b[index]) return 1;
      else return -1;
    } else return a[index] - b[index];
  });
}

function descendSort(index) {
  array.sort(function(a, b) {
    if (isNaN(a)||isNaN(b)) {
      if (b[index] > a[index]) return 1;
      else return -1;
    } else return b[index] - a[index];
  });
}


function display(that) {
  var table = $(that).parent().parent().parent().children("tbody").children("tr");
  var len = table.length;
  for (var i = 0; i < len; i++) {
    var trNumber = table.eq(i).children().length;
    for (var j = 0; j < trNumber; j++) {
      table[i].children[j].innerHTML = array[i][j];
    }
  }
}


