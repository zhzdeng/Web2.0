// by Zhong Hongzhen
var array = [];

// 载入页面后
window.onload = function() {
  clear();
};

// 按下0键
document.getElementById('button0').onclick = function() {
  if (!(array.length == 1&&array[0] == '0')) {
    array.push('0');
    display(arrayChange(array));
  }
};

// 按下1键
document.getElementById('button1').onclick = function() {
  array.push('1');
  display(arrayChange(array));
};

// 按下2键
document.getElementById('button2').onclick = function() {
  array.push('2');
  display(arrayChange(array));
};

// 按下3键
document.getElementById('button3').onclick = function() {
  array.push('3');
  display(arrayChange(array));
};

// 按下4键
document.getElementById('button4').onclick = function() {
  array.push('4');
  display(arrayChange(array));
};

// 按下5键
document.getElementById('button5').onclick = function() {
  array.push('5');
  display(arrayChange(array));
};

// 按下6键
document.getElementById('button6').onclick = function() {
  array.push('6');
  display(arrayChange(array));
};

// 按下7键
document.getElementById('button7').onclick = function() {
  array.push('7');
  display(arrayChange(array));
};

// 按下8键
document.getElementById('button8').onclick = function() {
  array.push('8');
  display(arrayChange(array));
};

// 按下9键
document.getElementById('button9').onclick = function() {
  array.push('9');
  display(arrayChange(array));
};

// 按下+键
document.getElementById('buttonplus').onclick = function() {
  array.push('+');
  display(arrayChange(array));
};

// 按下除号
document.getElementById('buttondiv').onclick = function() {
  array.push('/');
  display(arrayChange(array));
};

// 按下乘号
document.getElementById('buttonmul').onclick = function() {
  array.push('*');
  display(arrayChange(array));
};

// 按下减号
document.getElementById('buttondec').onclick = function() {
  array.push('-');
  display(arrayChange(array));
};

// 按下小数点
document.getElementById('buttondian').onclick = function() {
  if (array.length == 0) {
    array.push("0.");
  } else {
    array.push('.');
    display(arrayChange(array));
  }
};

// 按下退位键
document.getElementById('buttondelete').onclick = function() {
  array.pop();
  if (array.length == 0) {
    display("0");
  } else {
    display(arrayChange(array));
  }
};

// 按下左括号
document.getElementById('buttonleft').onclick = function() {
  array.push('(');
  display(arrayChange(array));
};

// 按下右括号
document.getElementById('buttonright').onclick = function() {
  array.push(')');
  display(arrayChange(array));
};

// 按下等号
document.getElementById('buttonequrt').onclick = function() {
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
document.getElementById('buttonCE').onclick = function() {
  clear();
  array = [];
};

// 清空函数
function clear() {
  var output = document.getElementById("output");
  output.value = "0";
};

// 数组转字符串
function arrayChange(array) {
  return array.join("");
};

// 显示函数
function display(string) {
  var output = document.getElementById("output");
  output.value = string;
};
