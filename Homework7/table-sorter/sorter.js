// ture 将升序 false 将降序
var isAscend = function isAscend() {
  var isascend = true;
  var before;
  return function change(that) {
    if (before === that) isascend = !isascend;
    else isascend = true, before = that;
    return isascend;
  }
}();
$("thead th").click(sorter);

array = new Array();

function sorter() {
  var that = this; // th
  var index = getTable(that);
  $(this).addClass("click");
  $(this).siblings().removeClass("click").removeClass("descend").removeClass("ascend");
  if (isAscend(that)) $(this).removeClass("descend").addClass("ascend"), ascendSort(index);
  else $(this).removeClass("ascend").addClass("descend"), descendSort(index);
  display(that);
}

function getTable(that) {
  var table = $(that).parents("table").children("tbody").children("tr");
  var len = table.length;
  for (var i = 0; i < len; i++) {
    var trNumber = table.eq(i).children().length, temp = [];
    for (var j = 0; j < trNumber; j++) temp[j] = table[i].children[j].innerHTML;
    array[i] = temp;
  }
  return $(that).index();
}

function ascendSort(index) {
  array.sort(function(a, b) {
    if (isNaN(a)||isNaN(b)) {
      // 字符排序
      if (a[index] > b[index]) return 1;
      else return -1;
    } else return a[index] - b[index];
    // 数字排序
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
  var table = $(that).parents("table").children("tbody").children("tr");
  var len = table.length;
  for (var i = 0; i < len; i++) {
    var trNumber = table.eq(i).children().length;
    for (var j = 0; j < trNumber; j++) table[i].children[j].innerHTML = array[i][j];
  }
}
