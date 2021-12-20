

drawAxis()

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let equation = e.target.elements[0].value;
  // TODO LATER Validate Equation

  // plot from x = 0 -> x = width
  ctx.strokeStyle = "#f0193b";
  ctx.beginPath()
  for (let i = 0; i < width; i++) {
      let y = evaluateExpression(equation);
      // shifts y 
      y = Math.abs(y - originY)
      ctx.lineTo(i,y)
  }
    ctx.stroke()

});
