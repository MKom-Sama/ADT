drawAxis();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let equation = e.target.elements[0].value;
  // TODO LATER Validate Equation

  // plot from x = 0 -> x = width
  ctx.strokeStyle = "#f0193b";
  ctx.beginPath();
  for (let i = -250; i < 150; i++) {
    let y = evaluateExpression(equation, i);
    // shifts y
    y = Math.abs(originY - y);
    x = i + originX;
    ctx.lineTo(x, y);   
  }
  ctx.closePath()
  ctx.stroke();
});
