drawAxis();

let scale = 25; // higher = more zoomed in
// y range +- height / scale
// x range +- width  / scale

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let equation = e.target.elements[0].value;
  let fromX = e.target.elements[1].value;
  let toX = e.target.elements[2].value;

  // Validate Equation
  const { error, msg } = validateExpression(equation);

  if (error) {
    alert(msg);
    return;
  }

  ctx.strokeStyle = "#f0193b";
  ctx.beginPath();
  for (let i = fromX; i <= toX; i++) {
    let y = evaluateExpression(equation, i);
    console.log("x : ", i, " y : ", y);
    ctx.lineTo(i * scale, y * scale);
    ctx.stroke()
  }
  // Todo Later use this for smoother lines on small scale
  // ctx.closePath();
  // ctx.stroke();
});
