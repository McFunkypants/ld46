// Ludum Dare 46 by McFunkypants
// a game made from scratch in 48hrs
// no libs, no engines, no assets, no old code

"use strict";

const DEBUGMODE = true;
const CAMSPD = 4;
const MAXZOOM = 10;
const MINZOOM = 1;
const ZOOMSPD = 0.1;
const worldW = 8000;
const worldH = 4500;

var screenCanvas, screenCTX, screenW, screenW2, screenH, screenH2, spritesheet;
var dragging, dragStartX, dragStartY;
var worldCanvas, worldCTX; 
var music, sfx, mute, volume;
var frame, camX, camY, zoom, zoomSmooth;
var userHasInteracted, up, right, down, left, mouseX, mouseY;
var things, numthings, folks, numfolks;
var x, y, i, num, debugDiv;

window.addEventListener("load", init);

function init() {
    if (DEBUGMODE) console.log("init");

    frame = 0;
    camX = 0;
    camY = 0;
    mouseX = 0;
    mouseY = 0;
    zoom = 1;
    zoomSmooth = 1;
    things = [];
    numthings = 0;
    folks = [];
    numfolks = 0;

    if (DEBUGMODE) {
        debugDiv = document.createElement("div");
        document.body.appendChild(debugDiv);
        debugDiv.style.bottom = "32px";
        debugDiv.style.right = "32px";
    }

    screenCanvas = document.createElement("canvas");
    document.body.appendChild(screenCanvas);
    screenCTX = screenCanvas.getContext('2d');
    resize();

    worldCanvas = document.createElement("canvas");
    worldCanvas.width = worldW;
    worldCanvas.height = worldH;
    worldCTX = worldCanvas.getContext('2d');

    music = document.createElement("audio");
    music.autoplay = false;
    music.src = "ld46.mp3";

    spritesheet = new Image();
    spritesheet.src = 'ld46.png'; 
    spritesheet.onload = animate;

    window.addEventListener("mousedown", onmousedown);
    window.addEventListener("mousemove", onmousemove);
    window.addEventListener("mouseup", onmouseup);
    window.addEventListener("keydown", onkeydown);
    window.addEventListener("keyup", onkeyup);
    window.addEventListener("wheel", onwheel);
    window.addEventListener("resize", resize);

}

function resize() {
    screenW = screenCanvas.width = window.innerWidth;
    screenH = screenCanvas.height = window.innerHeight;
    screenW2 = Math.abs(screenW/2);
    screenH2 = Math.abs(screenH/2);
    if (DEBUGMODE) console.log("resize "+screenW+"x"+screenH);
}

function addThing(name,x,y) {
    //if (DEBUGMODE) console.log("addThing " + name+","+x+","+y);
    var ent = { name:name, x:x, y:y };
    things[numthings] = ent;
    numthings++;
    return ent;
}

function addFolk(name,x,y) {
    //if (DEBUGMODE) console.log("addFolk " + name+","+x+","+y);
    var ent = { name:name, x:x, y:y };
    folks[numfolks] = ent;
    numfolks++;
    return ent;
}

var prevClientX = 0;
var prevClientY = 0;
var mouseDeltaX = 0;
var mouseDeltaY = 0;

function updateMousePos(e) { // in WORLD coords
    mouseX = Math.round((-screenW2+e.clientX)*zoomSmooth)+camX;
    mouseY = Math.round((-screenH2+e.clientY)*zoomSmooth)+camY;
}

function onmousemove(e) {
    updateMousePos(e);
    if (dragging) {
        mouseDeltaX = prevClientX - e.clientX;
        mouseDeltaY = prevClientY - e.clientY;
        camX += mouseDeltaX*zoomSmooth;
        camY += mouseDeltaY*zoomSmooth;
    }
    prevClientX = e.clientX;
    prevClientY = e.clientY;

}

function onmouseup(e) {
    updateMousePos(e);
    dragging = false;
    //mouseX = -(screenW2*zoomSmooth) + ((e.clientX - camX) * zoom);
    //mouseY = -(screenH2*zoomSmooth) + ((e.clientY - camY) * zoom);
}

function onmousedown(e) {
    if (DEBUGMODE) console.log("onmousedown " + e.clientX+","+e.clientY);
    
    updateMousePos(e);
    
    dragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;

    addThing("flower", mouseX, mouseY);
    //addFolk("Joe Schmoe", mouseX, mouseY);
    renderWorld(); // redraw the giant world and all things[]

    if (!userHasInteracted) {
        if (DEBUGMODE) console.log("playing music");
        userHasInteracted = true;
        music.play();
    }

}

function onwheel(e) {
    if (e.deltaY>0) {
        zoom++;
        if (zoom>MAXZOOM) zoom = MAXZOOM;
    } else {
        zoom--;
        if (zoom<MINZOOM) zoom = MINZOOM;
    }
    if (DEBUGMODE) console.log("wheel ("+e.deltaY+") zoom="+zoom);
}

function onkeydown(e) {
    if (DEBUGMODE) console.log("keydown " + e.keyCode);
    if(e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) { up = true; }
    if(e.keyCode == 39 || e.keyCode == 68) { right = true; }
    if(e.keyCode == 40 || e.keyCode == 83) { down = true; }
    if(e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81) { left = true; }
}
  
function onkeyup(e) {
    if(e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) { up = false; }
    if(e.keyCode == 39 || e.keyCode == 68) { right = false; }
    if(e.keyCode == 40 || e.keyCode == 83) { down = false; }
    if(e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 81) { left = false; }
}

function step() {

    if (frame==0) { // very first frame when all has loaded
        if (DEBUGMODE) console.log("Loading level!");
        // load level
        addThing("corner",0,0);
        for (i=0; i<1000; i++) {
            addThing("prop",Math.random()*worldW,Math.random()*worldH);
        }
        renderWorld();
    }


    frame++;

    // scroll camera
    if (up) { camY -= CAMSPD; }
    if (down) { camY += CAMSPD; }
    if (left) { camX -= CAMSPD; }
    if (right) { camX += CAMSPD; }
    // stay in bounds
    if (camX<0) camX=0;
    if (camY<0) camY=0;
    if (camX>worldW-screenW) camX=worldW-screenW;
    if (camY>worldH-screenH) camY=worldH-screenH;

    // lerp zoom
    if (zoom>zoomSmooth) { zoomSmooth+=ZOOMSPD; }
    if (zoom<zoomSmooth) { zoomSmooth-=ZOOMSPD; }
    // close enough to snap
    if (Math.abs(zoom-zoomSmooth)<ZOOMSPD) zoomSmooth = zoom;

}

function renderScreen() {
    screenCTX.clearRect(0,0,screenW,screenH);
    
    // the static world terrain bg
    // unzoomed: works // screenCTX.drawImage(worldCanvas,camX,camY,screenW,screenH,0,0,screenW,screenH);
    // zoomed+uncentered // screenCTX.drawImage(worldCanvas,camX,camY,screenW*zoomSmooth,screenH*zoomSmooth,0,0,screenW,screenH);
    screenCTX.drawImage(worldCanvas,camX-(screenW2*zoomSmooth),camY-(screenH2*zoomSmooth),screenW*zoomSmooth,screenH*zoomSmooth,0,0,screenW,screenH);
    
    // all dynamic objects
    for (i=0; i<numfolks; i++) {
        screenCTX.drawImage(spritesheet,folks[i].x-camX,folks[i].y-camY);
    }

    // test
    screenCTX.drawImage(spritesheet,screenW/2+Math.cos(frame/100)*screenW/3-camX,screenH/2-camY);

    // debug gui
    if (DEBUGMODE) {
        debugDiv.innerHTML = 
            "Frame:" + frame +
            " Cam:" + camX + "," + camY +
            " Mouse:" + mouseX + "," + mouseY;
    }

}

function renderWorld() {
    if (DEBUGMODE) console.log("renderWorld with "+numthings+" things");
    worldCTX.clearRect(0,0,worldW,worldH);
    for (i=0; i<numthings; i++) {
        worldCTX.drawImage(spritesheet,things[i].x,things[i].y);
    }
}

function animate() {
    step();
    renderScreen();
    requestAnimationFrame(animate);
}
