// Defining Vars and Functions to be used

var form = document.getElementById("form");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let height = canvas.clientHeight;
let width = canvas.clientWidth;
let originX = width / 2;
let originY = height / 2;

const drawAxis = () => {
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#0f3240";
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, height);
  ctx.moveTo(0, originY);
  ctx.lineTo(width, originY);
  ctx.stroke();
};

const isOperand = (char) => (parseInt(char) || char == '0' ? true : false);
const isOperator = (char) => {
  // Checks if its an operator also returns rank
  if (char == "+" || char == "-") return 1;
  if (char == "*" || char == "/") return 2;
  if (char == "^") return 2;
  return false;
};
const compareOp = (op1, op2) => {
  // returns true if op1 > op2
  if (isOperator(op1) > isOperator(op2)) return true;
  return false;
};
const doOperation = (op1, operand, op2) => {
  switch (operand) {
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    case "*":
      return op1 * op2;
    case "/":
      return op1 / op2;
    case "^":
      return Math.pow(op1, op2);
  }
};
const evaluateExpression = (eq, valX) => {
  let operators = [];
  let operands = [];

  for (let i = 0; i < eq.length; i++) {
    // console.log(isOperand(eq[i]))
    // console.log(isOperator(eq[i]))
    if (eq[i] == "x") {
      operands.push(valX);
    }
    if (isOperand(eq[i])) {
      operands.push(parseInt(eq[i]));
    }
    if (isOperator(eq[i])) {
      // check for precendence
      if (compareOp(eq[i], operators[operators.length - 1])) {
        operators.push(eq[i]);
      } else {
        op1 = operands.pop();
        op2 = operands.pop();
        operator = operators.pop();
        operands.push(doOperation(op2, operator, op1));
        operators.push(eq[i]);
      }
    }
  }
  while (operators.length > 0) {
    op1 = operands.pop();
    op2 = operands.pop();
    operator = operators.pop();
    operands.push(doOperation(op2, operator, op1));
  }
  return Math.ceil(operands.pop());
};
