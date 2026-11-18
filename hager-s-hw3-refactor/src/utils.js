const makeColor = (red, green, blue, alpha = 1) => `rgba(${red},${green},${blue},${alpha})`;

const getRandom = (min, max) => Math.random() * (max - min) + min;

const getLinearGradient = (ctx, startX, startY, endX, endY, colorStops) => {
  let lg = ctx.createLinearGradient(startX, startY, endX, endY);
  for (let stop of colorStops) {
    lg.addColorStop(stop.percent, stop.color);
  }
  return lg;
};

const goFullscreen = (element) => {
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
};

export { makeColor, getRandom, getLinearGradient, goFullscreen };