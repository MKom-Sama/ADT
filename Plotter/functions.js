// Defining Vars and Functions to be used

var form = document.getElementById("form");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let height = canvas.clientHeight;
let width = canvas.clientWidth;
let originX = width / 2;
let originY = height / 2;

const drawAxis = () => {
  ctx.strokeStyle = "#2c51cb";
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, height);
  ctx.moveTo(0, originY);
  ctx.lineTo(width, originY);
  ctx.stroke();
};

const evaluateExpression = (equation) => {
    return -120
}