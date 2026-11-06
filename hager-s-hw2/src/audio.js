// mic input + note detection
let audioCtx, analyserNode, sourceNode, stream;
let magnitudes;

const FftSize = 4096;
const MinStrength = -55;
const NoteNames = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

async function start() {
  const AC = window.AudioContext || window.webkitAudioContext;
  audioCtx = audioCtx || new AC();
  if (audioCtx.state === "suspended") await audioCtx.resume();

  // turn off browser voice processing
  stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
  });
  
  // set notes up
  sourceNode = audioCtx.createMediaStreamSource(stream);
  analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = FftSize;
  analyserNode.smoothingTimeConstant = 0.6;
  magnitudes = new Float32Array(analyserNode.frequencyBinCount);
  sourceNode.connect(analyserNode);
}

function stop() {
  if (stream) stream.getTracks().forEach(t => t.stop());
  if (sourceNode) sourceNode.disconnect();
  stream = sourceNode = analyserNode = null;
}

const isRunning = () => !!analyserNode;

// returns {note, strength}
function detectNote() {
  if (!analyserNode) return { note: "No note", strength: -Infinity };
  analyserNode.getFloatFrequencyData(magnitudes);

  // skip 0
  let bestIndex = 1;
  for (let i = 2; i < magnitudes.length; i++) {
    if (magnitudes[i] > magnitudes[bestIndex]) bestIndex = i;
  }
  const strength = magnitudes[bestIndex];
  if (strength < MinStrength) return { note: "No note", strength };

  const frequency = bestIndex * audioCtx.sampleRate / FftSize;
  const noteNumber = Math.round(69 + 12 * Math.log2(frequency / 440));
  const noteName = NoteNames[((noteNumber % 12) + 12) % 12];
  const octave = Math.floor(noteNumber / 12) - 1;
  return { note: noteName + octave, strength, pitchClass: ((noteNumber % 12) + 12) % 12, frequency };
}

// dB spectrum (read-only use) for the radial bars
const getSpectrum = () => magnitudes;

export { start, stop, isRunning, detectNote, getSpectrum, MinStrength as MIN_STRENGTH };