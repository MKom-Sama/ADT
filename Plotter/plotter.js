let scale = document.getElementById("zoom").value; // higher = more zoomed in

drawAxis(scale);
// Listener for scale change
document.getElementById("zoom").addEventListener("change", (e) => {
  scale = e.target.value;
  clearCanvas();
  drawAxis(scale);
});

// On Pressing Plot or hitting Enter
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

  // Plot Equation
  ctx.beginPath();
  for (let i = fromX; i <= toX; i++) {
    let y = evaluateExpression(equation, i);
    // console.log("x : ", i, " y : ", y);
    ctx.lineTo(i * scale, y * scale);
    ctx.stroke();
  }
});
