/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams = {
  showGradient : true,
  showBars : true,
  showCircles : true,
  showNoise : true,
  showInvert : true,
  showEmboss : true
}

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/New Adventure Theme.mp3"
});

function init(){
  audio.setupWebaudio(DEFAULTS.sound1);
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
	setupUI(canvasElement);
  canvas.setupCanvas(canvasElement,audio.analyserNode);
  loop();
}

function setupUI(canvasElement){
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  playButton.onclick = e => {
    console.log(`audioCtx.state before ${audio.audioCtx.state}`);

    // check if ocntext is in suspended state for autoplay
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if (e.target.dataset.playing == "no") {
      // if track is paused play
      audio.playCurrentSound();
      e.target.dataset.playing = "yes";
    } else {
      // if it is playing pause
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no";
    }
  };

  // c - volume slider and lable
  let volumeSlider = document.querySelector("#volumeSlider");
  let volumeLabel = document.querySelector("#volumeLabel");

  // add .oninput event to slider
  volumeSlider.oninput = e => {
    // set gain
    audio.setVolume(e.target.value);
    // update value to match slider
    volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
  };

  // set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  // D hookup track <select>
  let trackSelect = document.querySelector("#trackSelect");
  // add .onchange event
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);
    // pause track if it is playing
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };

  // checkboxes
  const gradientCB = document.querySelector("#gradientCB");
  const barsCB = document.querySelector("#barsCB");
  const circlesCB = document.querySelector("#circlesCB");
  const noiseCB = document.querySelector("#noiseCB");
  const invertCB = document.querySelector("#invertCB");
  const embossCB =  document.querySelector("#embossCB");
  gradientCB.checked = true;
  barsCB.checked = true;
  circlesCB.checked = true;
  // set noise, invert, and emboss to off
  noiseCB.checked = false;
  invertCB.checked = false;
  embossCB.checked = false;
  drawParams.showNoise = false;
  drawParams.showInvert = false;
  drawParams.showEmboss = false;


  // checkbox event listeners
  gradientCB.onchange = e => {
    drawParams.showGradient = e.target.checked;
  };

  barsCB.onchange = e => {
    drawParams.showBars = e.target.checked;
  };

  circlesCB.onchange = e => {
    drawParams.showCircles = e.target.checked;
  };

  noiseCB.onchange = e => {
    drawParams.showNoise = e.target.checked;
  }

  invertCB.onchange = e => {
    drawParams.showInvert = e.target.checked;
  }

  embossCB.onchange = e => {
    drawParams.showEmboss = e.target.checked;
  }
} // end setupUI

function loop(){
  requestAnimationFrame(loop);
  canvas.draw(drawParams);
}

export {init};