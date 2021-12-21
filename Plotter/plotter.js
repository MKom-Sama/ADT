drawAxis();

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
  for (let i = -100; i < 100; i++) {
    let y = evaluateExpression(equation, i);
    // shifts y
    // y = Math.abs(originY - y);
    // x = i + originX;
    console.log(`F(${i}) = ${evaluateExpression(equation, i)}`);
    // y = sigmoid((y)*0.04)*height;
    // y = Math.abs(originY - y);
    y = sigmoid(-y * 0.02) * height;
    x = sigmoid(i * 0.02) * width;
    console.log("x : ", x, " y : ", y);
    
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  // ctx.closePath();
  // ctx.stroke();
});
