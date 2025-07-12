const canvas = globalThis.document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = globalThis.innerWidth;
let height = globalThis.innerHeight;
canvas.width = width;
canvas.height = height;

globalThis.addEventListener('resize', () => {
  width = globalThis.innerWidth;
  height = globalThis.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// Generate full heart path
const heartPoints = [];
const step = 0.01;
for (let t = 0; t < Math.PI * 2; t += step) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  heartPoints.push([x * 20, y * 20]); // Make heart big
}

const totalPoints = heartPoints.length;
const arcLength = Math.floor(totalPoints * 0.3); // 30%
const gapLength = Math.floor(totalPoints * 0.3); // 30% gap

let counter = 0;

function drawArc(startIndex, length, color) {
  ctx.beginPath();
  for (let i = 0; i < length; i++) {
    const index = (startIndex + i) % totalPoints;
    const [x, y] = heartPoints[index];
    if (i === 0) ctx.moveTo(width / 2 + x, height / 2 + y);
    else ctx.lineTo(width / 2 + x, height / 2 + y);
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.shadowColor = color;
  ctx.shadowBlur = 25;
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  const leadStart = counter % totalPoints;
  const followStart = (counter + arcLength + gapLength) % totalPoints;

  drawArc(followStart, arcLength, 'rgba(0, 191, 255, 0.9)'); // Blue trailing
  drawArc(leadStart, arcLength, 'rgba(255, 20, 147, 0.9)');  // Pink leading

  counter = (counter + 3) % totalPoints;
  globalThis.requestAnimationFrame(animate);
}

animate();
