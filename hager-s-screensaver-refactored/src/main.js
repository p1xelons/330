import { getRandomColor,getRandomInt } from "./utils.js";
import {drawRectangle,drawLine,drawArc} from "./canvas-utils.js";
"use strict";

let ctx;
let paused = false;
let canvas;
let createRectangles = true;
let createLines = true;
let createArcs = true;
	
const init = () => {
	console.log("page loaded!");
	// #2 Now that the page has loaded, start drawing!
	
	// A - `canvas` variable points at <canvas> tag
	canvas = document.querySelector("canvas");
	
	// B - the `ctx` variable points at a "2D drawing context"
	ctx = canvas.getContext("2d");
	
    drawRectangle(ctx,20,20,600,440,"red");


    // rect()
    drawRectangle(ctx,120,120,400,300,"yellow",10,"magenta");

    // lines
    drawLine(ctx,20,20,620,460,5,"magenta");
    drawLine(ctx,620,20,20,460,5,"magenta");

    // circle
    drawArc(ctx,320,240,50,0,Math.PI * 2,"green",3,"purple");

    // semi-circle
    drawArc(ctx,320,240,20,0,Math.PI,"gray",3,"yellow");

    // eyes
    drawArc(ctx,300,220,10,0,Math.PI * 2,"white",3,"black");
    drawArc(ctx,340,220,10,0,Math.PI * 2,"white",3,"black");
    
    // 600-pixel line
    drawLine(ctx,20,400,620,400,20,"blue");

    setupUI();
    update(ctx);
}

const update = () => {
    if (paused) return;
    requestAnimationFrame(update);
    if (createRectangles) drawRandomRect(ctx);
    if (createLines) drawRandomLine(ctx);
    if (createArcs) drawRandomArc(ctx);
}

const drawRandomRect = (ctx) => {
    let x = getRandomInt(0,640);
    let y = getRandomInt(0,480);
    let width = getRandomInt(0,90);
    let height = getRandomInt(0,90);
    let lineWidth = getRandomInt(2,12);
    drawRectangle(ctx,x,y,width,height,getRandomColor(),lineWidth,getRandomColor())
}

const drawRandomLine = (ctx) => {
    let x1 = getRandomInt(0,640);
    let y1 = getRandomInt(0,480);
    let x2 = getRandomInt(0,640);
    let y2 = getRandomInt(0,480);
    let lineWidth = getRandomInt(2,5);
    drawLine(ctx, x1, y1, x2, y2, lineWidth, getRandomColor());
}

const drawRandomArc = (ctx) => {
    let x = getRandomInt(0,640);
    let y = getRandomInt(0,480);
    let radius = getRandomInt(10,60);
    let startAngle = getRandomInt(0,360) * Math.PI / 180;
    let endAngle = getRandomInt(0,360) * Math.PI / 180;
    let lineWidth = getRandomInt(1,6);

    drawArc(ctx,x,y,radius,startAngle,endAngle,getRandomColor(),lineWidth,getRandomColor());
}

// event handlers
const canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX,mouseY);

    for(let i=0;i<10;i++){
        let x = getRandomInt(-100,100) + mouseX;
        let y = getRandomInt(-100,100) + mouseY;
        let radius = getRandomInt(10,60);
        let startAngle = getRandomInt(0,360) * Math.PI / 180;
        let endAngle = getRandomInt(0,360) * Math.PI / 180;
        let lineWidth = getRandomInt(1,6);
        drawArc(ctx,x,y,radius,startAngle,endAngle,getRandomColor(),lineWidth,getRandomColor());
    }
}

// helper functions
const setupUI = () => {
    document.querySelector("#btn-pause").onclick = () => {
        paused = true;
    };

    document.querySelector("#btn-play").onclick = () => {
        if (!paused) return;
        paused = false;
        update();
    };

    document.querySelector("#btn-clear").onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };


    canvas.onclick = canvasClicked;

    // checkboxes
    document.querySelector("#cb-rectangles").onclick = (e) => {
        createRectangles = e.target.checked;
    }
    document.querySelector("#cb-lines").onclick = (e) => {
        createLines = e.target.checked;
    }
    document.querySelector("#cb-arcs").onclick = (e) => {
        createArcs = e.target.checked;
    }
}

window.onload = init;