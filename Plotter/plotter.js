drawAxis();

let scale = 25; // higher = more zoomed in
// y range +- height / scale
// x range +- width  / scale

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let equation = e.target.elements[0].value;
  // Validate Equation
  const { error, msg } = validateExpression(equation);

  if (error) {
    alert(msg);
    return;
  }

  ctx.strokeStyle = "#f0193b";
  ctx.beginPath();
  for (let i = -width; i < width; i++) {
    let y = evaluateExpression(equation, i);
    console.log("x : ", i, " y : ", y);
    ctx.lineTo(i * scale, y * scale);
    ctx.stroke();
  }
  // ctx.closePath();
  // ctx.stroke();
});
