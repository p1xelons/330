import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

let startButton, stopButton, statusElement;

function init() {
    // get html elements
  const canvasElement = document.querySelector("canvas");
  startButton = document.querySelector("#start-button");
  stopButton = document.querySelector("#stop-button");
  statusElement = document.querySelector("#status");
  canvas.setupCanvas(canvasElement);

  // go full screen
  document.querySelector("#fs-button").onclick = () => utils.goFullscreen(canvasElement);

  // start mic listening
  startButton.onclick = async () => {
    try {
      await audio.start();
      startButton.disabled = true;
      stopButton.disabled = false;
      statusElement.textContent = "Listening";
    } catch (err) {
        // error handling
      statusElement.textContent = "Could not open the microphone: " + err.message;
    }
  };

  // stop mic listening
  stopButton.onclick = () => {
    audio.stop();
    canvas.clear();
    startButton.disabled = false;
    stopButton.disabled = true;
    statusElement.textContent = "Stopped.";
  };

  loop();
}

function loop() {
  requestAnimationFrame(loop);
  const running = audio.isRunning();
  const result = running ? audio.detectNote() : { note: "No note" };
  canvas.draw({ result, spectrum: running ? audio.getSpectrum() : null, running });
}

export { init };