// Ludum Dare 46 by McFunkypants
// a game made from scratch in 48hrs
// no libs, no engines, no assets, no old code

"use strict";

const DEBUGMODE = true;

var screenCanvas, screenCTX, screenW, screenH, spritesheet;
var worldCanvas, world, worldW, worldH;
var music, sfx, mute, volume;
var frame, camX, camY, zoom;
var userHasInteracted, up, right, down, left, mouseX, mouseY;
var things, numthings, folks, numfolks;
var x, y, i, num;

window.addEventListener("load", init);

function init() {
    if (DEBUGMODE) console.log("init");

    frame = 0;
    camX = 0;
    camY = 0;
    mouseX = 0;
    mouseY = 0;
    zoom = 1;
    things = [];
    numthings = 0;
    folks = [];
    numfolks = 0;

    screenCanvas = document.createElement("canvas");
    document.body.appendChild(screenCanvas);
    screenCTX = screenCanvas.getContext('2d');
    resize();

    worldCanvas = document.createElement("canvas");
    world = worldCanvas.getContext('2d');
    resize();

    music = document.createElement("audio");
    music.autoplay = false;
    music.src = "ld46.mp3";

    spritesheet = new Image();
    spritesheet.src = 'ld46.png'; 
    spritesheet.onload = animate;

    window.addEventListener("mousedown", onclick);
    window.addEventListener("keydown", onkeydown);
    window.addEventListener("keyup", onkeyup);
    window.addEventListener("wheel", onwheel);
    window.addEventListener("resize", resize);
}

function resize() {
    if (DEBUGMODE) console.log("resize");
    screenW = screenCanvas.width = window.innerWidth;
    screenH = screenCanvas.height = window.innerHeight;
}

function addThing(name,x,y) {
    if (DEBUGMODE) console.log("addThing " + name+","+x+","+y);
    var ent = { name:name, x:x, y:y };
    things[numthings] = ent;
    numthings++;
    return ent;
}

function onclick(e) {
    if (DEBUGMODE) console.log("click " + e.clientX+","+e.clientY);
    
    // in world coordinates
    mouseX = e.clientX - camX;
    mouseY = e.clientY - camY;

    addThing("flower", mouseX, mouseY);

    if (!userHasInteracted) {
        if (DEBUGMODE) console.log("playing music");
        userHasInteracted = true;
        music.play();
    }

}

function onwheel(e) {
    if (DEBUGMODE) console.log("wheel " + e.deltaY);
}

function onkeydown(e) {
    if (DEBUGMODE) console.log("keydown " + e.keyCode);
    if(e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) { up = true; }
    if(e.keyCode == 39 || e.keyCode == 68) { right = true; }
    if(e.keyCode == 40 || e.keyCode == 83) { down = true; }
    if(e.keyCode == 37 || e.keyCode == 65 ||e.keyCode == 81) { left = true; }
}
  
function onkeyup(e) {
    if(e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) { up = false; }
    if(e.keyCode == 39 || e.keyCode == 68) { right = false; }
    if(e.keyCode == 40 || e.keyCode == 83) { down = false; }
    if(e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81) { left = false; }
}

function step() {
    frame++;
}

function render() {
    screenCTX.clearRect(0,0,screenW,screenH);
    screenCTX.drawImage(spritesheet,screenW/2+Math.cos(frame/100)*screenW/3,screenH/2);

    for (i=0; i<numthings; i++) {
        screenCTX.drawImage(spritesheet,things[i].x-camX,things[i].y-camY);
    }
}

function animate() {
    step();
    render();
    requestAnimationFrame(animate);
}
