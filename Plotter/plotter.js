drawAxis();

let scale = 25;
// y range +- height / scale
// x range +- width  / scale

const sigmoid = (val) => {
  return 1 / (1 + Math.exp(-val));
};
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let equation = e.target.elements[0].value;
  // TODO LATER Validate Equation

  // plot from x = 0 -> x = width
  ctx.strokeStyle = "#f0193b";
  ctx.beginPath();
  for (let i = -width; i < width; i++) {
    let y = evaluateExpression(equation, i);
    console.log("x : ", i, " y : ", y);
    ctx.lineTo(i*scale, y*scale);
    ctx.stroke();
  }
  // ctx.closePath();
  // ctx.stroke();
});
