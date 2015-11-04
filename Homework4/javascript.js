var array = [];

window.onload = function() {
  clear();
}

document.getElementById('button0').onclick = function() {
  if (parseInt(arrayChange(array)) != 0) {
    array.push('0');
    display(arrayChange(array));
  }
}

document.getElementById('button1').onclick = function() {
  array.push('1');
  display(arrayChange(array));
}

document.getElementById('button2').onclick = function() {
  array.push('2');
  display(arrayChange(array));
}

document.getElementById('button3').onclick = function() {
  array.push('3');
  display(arrayChange(array));
}

document.getElementById('button4').onclick = function() {
  array.push('4');
  display(arrayChange(array));
}

document.getElementById('button5').onclick = function() {
  array.push('5');
  display(arrayChange(array));
}

document.getElementById('button6').onclick = function() {
  array.push('6');
  display(arrayChange(array));
}

document.getElementById('button7').onclick = function() {
  array.push('7');
  display(arrayChange(array));
}

document.getElementById('button8').onclick = function() {
  array.push('8');
  display(arrayChange(array));
}

document.getElementById('button9').onclick = function() {
  array.push('9');
  display(arrayChange(array));
}

document.getElementById('buttonplus').onclick = function() {
  array.push('+');
  display(arrayChange(array));
}

document.getElementById('buttondiv').onclick = function() {
  array.push('/');
  display(arrayChange(array));
}

document.getElementById('buttonmul').onclick = function() {
  array.push('*');
  display(arrayChange(array));
}

document.getElementById('buttondec').onclick = function() {
  array.push('-');
  display(arrayChange(array));
}

document.getElementById('buttondian').onclick = function() {
  if (array.length == 0) {
    array.push("0.");
  } else {
    array.push('.');
    display(arrayChange(array));
  }
}

document.getElementById('buttondelete').onclick = function() {
  array.pop();
  display(arrayChange(array));
}

document.getElementById('buttonleft').onclick = function() {
  array.push('(');
  display(arrayChange(array));
}

document.getElementById('buttonright').onclick = function() {
  array.push(')');
  display(arrayChange(array));
}

document.getElementById('buttonequrt').onclick = function() {
  try {
    var number = eval(arrayChange(array));
    display(number);
  } catch(err) {
    alert("表达式错误");
  }
  array = [];
}

document.getElementById('buttonCE').onclick = function() {
  clear();
  array = [];
}

function clear() {
  var output = document.getElementById("output");
  output.value = "0";
}

function arrayChange(array) {
  return array.join("");
}

function display(string) {
  var output = document.getElementById("output");
  output.value = string;
}
