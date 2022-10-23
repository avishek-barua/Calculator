//selector
const output = document.querySelector(".output");
const result = document.querySelector(".result");
const keys = document.querySelectorAll("button");
var noDot = false;
//eventlistener
keys.forEach((keys) => {
  keys.addEventListener("click", calculate);
});
function calculate() {
  let buttonText = this.innerText;
  if (isNaN(parseInt(buttonText)) && buttonText != ".") {
    noDot = false;
  }
  if (buttonText === "." && !noDot) {
    noDot = true;
  } else if (buttonText === "." && noDot) {
    return;
  }
  if (buttonText === "C") {
    output.innerText = "";
    result.innerText = "0";
    return;
  } else if (buttonText === "Del") {
    output.textContent = output.textContent.substring(0, output.textContent.length - 1);
    return;
  } else if (buttonText === "=") {
    // result.innerText = eval(output.innerText);
    var expression = output.innerText;
    var currentNumber = '';
    var numberArray = [];
    var operatorArray = [];
    for (let index = 0; index < output.innerText.length; index++) {
      if (!isNaN(expression[index]) || expression[index] == '.') {
        currentNumber += expression[index];
      }
      if (index == (expression.length - 1)) {
        if (currentNumber.includes('.')) {
          numberArray.push(parseFloat(currentNumber));
        } else {
          numberArray.push(parseInt(currentNumber));
        }
      }
      if (expression[index] == '+' || expression[index] == '-' || expression[index] == '*' || expression[index] == '/' || expression[index] == '%') {
        if (currentNumber.includes('.')) {
          numberArray.push(parseFloat(currentNumber));
        } else {
          numberArray.push(parseInt(currentNumber));
        }
        currentNumber = '';
        operatorArray.push(expression[index]);
        // break;
      }
    }
    console.log({ operatorArray, numberArray });
    var resultNum = 1
    var currentOperator = '*'
    var operatorIndex = 0;
    for (let index = 0; index < numberArray.length; index++) {
      if (index == 0) {
        resultNum *= numberArray[index];
        currentOperator = operatorArray[0];
      } else if (currentOperator == '+') {
        resultNum += numberArray[index];
        operatorIndex++;
        currentOperator = operatorArray[operatorIndex];
      }
      else if (currentOperator == '-') {
        resultNum -= numberArray[index];
        operatorIndex++;
        currentOperator = operatorArray[operatorIndex];
      } else if (currentOperator == '*') {
        resultNum *= numberArray[index];
        operatorIndex++;
        currentOperator = operatorArray[operatorIndex];
      } else if (currentOperator == '/') {
        resultNum /= numberArray[index];
        operatorIndex++;
        currentOperator = operatorArray[operatorIndex];
      } else if (currentOperator == '%') {
        // resultNum %= numberArray[index];
        resultNum /= 100;
        operatorIndex++;
        currentOperator = operatorArray[operatorIndex];
      }
    }
    console.log(resultNum);
    result.innerText = resultNum;

  } else if (output.innerText.length > 20) {
    return;
  } else {
    output.textContent += buttonText;
    return;
  }
}