import { randomElement } from "./utils.js";

let words1 = [];
let words2 = [];
let words3 = [];

// generates `num` lines of technobabble and displays them in #output
const generateTechno = (num) => {
  const lines = [];
  for (let i = 0; i < num; i++) {
    lines.push(`${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}`);
  }
  document.querySelector("#output").innerHTML = lines.join("<br>");
};

// fires once the babble-data.json request completes
const babbleLoaded = (e) => {
  const json = JSON.parse(e.target.responseText);
  words1 = json.words1;
  words2 = json.words2;
  words3 = json.words3;

  document.querySelector("#btn-gen-1").addEventListener("click", () => generateTechno(1));
  document.querySelector("#btn-gen-5").addEventListener("click", () => generateTechno(5));

  // show babble on start
  generateTechno(1);
};

// loads babble from json
const loadBabble = () => {
  const xhr = new XMLHttpRequest();
  xhr.onload = babbleLoaded;
  xhr.open("GET", "data/babble-data.json");
  xhr.send();
};

loadBabble();