import { formatGreeting } from "./utils";

const input = document.querySelector<HTMLInputElement>("#input-firstname")!;
const output = document.querySelector<HTMLParagraphElement>("#output")!;
const cbForcefully = document.querySelector<HTMLInputElement>("#cb-forcefully")!;

const helloButton = document.querySelector<HTMLButtonElement>("#btn-hello")!;
const goodbyeButton = document.querySelector<HTMLButtonElement>("#btn-goodbye")!;

let forcefully: boolean = cbForcefully.checked;

cbForcefully.onchange = e => forcefully = (e.target as HTMLInputElement).checked;
helloButton.onclick = () => output.innerHTML = formatGreeting("Hello", input.value.trim(), forcefully);
goodbyeButton.onclick = () => output.innerHTML = formatGreeting("Goodbye", input.value.trim(), forcefully);