// Defining Vars and Functions to be used

var form = document.getElementById("form");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let height = canvas.clientHeight;
let width = canvas.clientWidth;
let originX = width / 2;
let originY = height / 2;

const clearCanvas = () => {
  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
};
const drawAxis = (scale) => {
  // drawing axis
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#0f3240";
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, height);
  ctx.moveTo(0, originY);
  ctx.lineTo(width, originY);
  ctx.stroke();

  // change default canvas config so it suits our application
  ctx.translate(originX, originY);
  // displaying border values
  ctx.font = "italic bold 10pt Tahoma";
  //  x-axis
  borderX = Math.ceil((width * 0.5) / scale);
  ctx.fillText(`${borderX}`, width * 0.5 - 20, -8);
  ctx.fillText(`-${borderX}`, -(width * 0.5) + 8, -8);
  // y-axis
  borderY = Math.ceil((height * 0.5) / scale);
  ctx.fillText(`${borderY}`, 8, -height * 0.5 + 20);
  ctx.fillText(`-${borderY}`, 8, height * 0.5 - 8);

  ctx.scale(1, -1);
  // for smoother lines
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
};
const isOperand = (char) => (parseInt(char) || char == "0" ? true : false);
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
  // corner case
  if (eq[0] == "-") {
    eq = "0 " + eq;
  }
  for (let i = 0; i < eq.length; i++) {
    // console.log(isOperand(eq[i]))
    // console.log(isOperator(eq[i]))
    if (eq[i] == "x") {
      operands.push(valX);
    }
    if (isOperand(eq[i])) {
      // multiple digit support
      let num = eq[i];
      while (isOperand(eq[i + 1])) {
        num = num + eq[i++];
      }
      operands.push(parseInt(num));
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
const validateExpression = (eq) => {
  // returns {error,msg}
  // Validates expression
  // no equation input
  // no two operators next to each other
  // no other symbols but operators & x
  let error = false;
  let msg = "OK Equation";
  // removing spaces
  eq = eq.replace(/\s+/g, "");
  for (let i = 0; i < eq.length; i++) {
    if (isOperator(eq[i])) {
      // if its in the end of the equation
      if (i + 1 == eq.length) {
        // ex : x+2-
        return {
          error: true,
          msg: "Missing Operand at the end of the Equation",
        };
      }
      // if its next to another operator
      if (isOperator(eq[i + 1])) {
        // ex : x++2
        return {
          error: true,
          msg: "Can't have two operators next to each other",
        };
      }
    }

    // must be either operator , operand or x
    if (!(isOperator(eq[i]) || isOperand(eq[i]) || eq[i] == "x")) {
      return {
        error: true,
        msg: `syntax err : can't use ${eq[i]}`,
      };
    }
  }
  return { error, msg };
};
