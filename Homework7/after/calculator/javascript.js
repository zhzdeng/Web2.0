// by Zhong Hongzhen
var array = [];
var result = document.getElementById('output');

// 载入页面后
$(clear);

// 获取按钮值
$('button').click(function() {
  if (this.name === "delete") {
    myDelete();
  } else if (this.name === "CE") {
    CE();
  } else if (this.name === "equrt") {
    equrt();
  } else {
    array.push(this.name);
    display(arrayChange(array));
  }
});

// 按下退位键
function myDelete() {
  array.pop();
  if (array.length == 0) {
    display("0");
  } else {
    display(arrayChange(array));
  }
};

// 按下等号
function equrt() {
  if (array.length != 0) {
    while (array[0] == '0') array.shift();
    try {
      var number = parseFloat(eval(arrayChange(array)).toFixed(8));
      display(number);
    } catch(err) {
      alert("表达式错误");
    }
    array = [];
  }
};

// 按下清空
function CE() {
  clear();
  array = [];
};

// 清空函数
function clear() {
  $("#output").val('0');
};

// 数组转字符串
function arrayChange(array) {
  return array.join("");
};

// 显示函数
function display(string) {
  $("#output").val(string);
  scrollToEnd();
};

// 光标自动跟随
function scrollToEnd() {
  result.scrollLeft = result.scrollWidth - result.clientWidth;
}
