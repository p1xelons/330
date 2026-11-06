import * as utils from './utils.js';

let ctx, canvasWidth, canvasHeight, gradient;
let echoes = [];
let lastNote = "No note";

const BarCount = 64;

function setupCanvas(canvasElement) {
  ctx = canvasElement.getContext("2d");
  canvasWidth = canvasElement.width;
  canvasHeight = canvasElement.height;
  gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [
    { percent: 0, color: "#6BD189" },
    { percent: 0.6, color: "#00B346" },
    { percent: 1, color: "#006734" }
  ]);
  clear();
}

function draw({ result, spectrum, running }) {
  const hasNote = running && result.note !== "No note";

  // background
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.globalAlpha = 0.35;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.restore();

  // bars on bottom
  if (running && spectrum) {
    const barWidth = canvasWidth / BarCount;
    ctx.save();
    ctx.fillStyle = utils.makeColor(255, 255, 255, 0.5);
    for (let i = 0; i < BarCount; i++) {
      // spectrum is in dB (about -100 to -30), turn it into 0..1
      const level = Math.max(0, Math.min(1, (spectrum[i + 1] + 100) / 70));
      const barHeight = level * canvasHeight * 0.4;
      ctx.fillRect(i * barWidth, canvasHeight - barHeight, barWidth - 2, barHeight);
    }
    ctx.restore();
  }

  // echo for note changes
  if (hasNote && result.note !== lastNote) {
    echoes.push({
      text: result.note,
      hue: result.pitchClass * 30,
      x: utils.getRandom(canvasWidth * 0.2, canvasWidth * 0.8),
      y: canvasHeight * 0.7,
      age: 0
    });
  }
  lastNote = hasNote ? result.note : "No note";

  // fade out and upwards
  ctx.save();
  ctx.font = "bold 40px sans-serif";
  ctx.textAlign = "center";
  for (let i = echoes.length - 1; i >= 0; i--) {
    const e = echoes[i];
    e.age++;
    if (e.age > 90) { echoes.splice(i, 1); continue; }
    ctx.save();
    ctx.translate(e.x, e.y - e.age * 3);
    ctx.globalAlpha = 1 - e.age / 90;
    ctx.fillStyle = `hsl(${e.hue},90%,70%)`;
    ctx.fillText(e.text, 0, 0);
    ctx.restore();
  }
  ctx.restore();

  // center text
  ctx.save();
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (!running) {
    ctx.globalAlpha = 0.6;
    ctx.font = "24px sans-serif";
    ctx.fillText("Press Start", canvasWidth / 2, canvasHeight / 2);
  } else if (hasNote) {
    ctx.fillStyle = `hsl(${result.pitchClass * 30},90%,70%)`;
    ctx.font = "bold 90px sans-serif";
    ctx.fillText(result.note, canvasWidth / 2, canvasHeight / 2);
  } else {
    ctx.globalAlpha = 0.4;
    ctx.font = "28px sans-serif";
    ctx.fillText("listening...", canvasWidth / 2, canvasHeight / 2);
  }
  ctx.restore();
}

function clear() {
  echoes = [];
  lastNote = "No note";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

export { setupCanvas, draw, clear };