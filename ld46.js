/*

█████████████████████████████████████████████████████████████
█▄─▄▄─█─▄▄─█▄─▄███▄─▀─▄██████▄─▄█▄─▀█▄─▄█████─▄─▄─█─█─█▄─▄▄─█
██─▄███─██─██─██▀██▀─▀████████─███─█▄▀─████████─███─▄─██─▄█▀█
█▄▄▄███▄▄▄▄█▄▄▄▄▄█▄▄█▄▄██████▄▄▄█▄▄▄██▄▄██████▄▄▄██▄█▄█▄▄▄▄▄█

█████████████████████████████████████████████████████████████
█░░░░░░██░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░███
█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀░░░░█
█░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░▄▀▄▀░░█
█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█
█░░▄▀░░░░░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█
█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█
█░░▄▀░░░░░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█
█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█░░▄▀░░██░░▄▀░░█
█░░▄▀░░██░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░░░▄▀░░█░░▄▀░░░░▄▀▄▀░░█
█░░▄▀░░██░░▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀▄▀░░█░░▄▀▄▀▄▀▄▀░░░░█
█░░░░░░██░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░░░█░░░░░░░░░░░░███
█████████████████████████████████████████████████████████████

Made with love by McFunkypants http://mcfunkypants.com

*/

"use strict";

const DEBUGMODE = false;
const DEBUGAI = true;
const DEBUG_PROPS = 5000;
const FOLKRADIUS = 32;
const THINGRADIUS = 32;
const CAMSPD = 4;
const DRAGTHRESHOLD = 3;
const MAXZOOM = 10;
const MINZOOM = 1;
const ZOOMSPD = 0.1;
const AISPD = 0.5;
const AITURNSPD = 0.05;
const WORLDW = 10000;
const WORLDH = 10000;

// gui layout, on-screen small sizes
const SCOREW = 256/2;
const SCOREH = 192/2;
const BBARW = 448/2;
const BBARH = 160/2;
const QUESTW = 288;
const QUESTH = 112;
const LOGOW = 448;
const LOGOH = 448;
const FOLKW = 64;
const FOLKH = 64;
const PINW = 64;
const PINH = 96;

// spritesheet large sizes
const SMALLER = 0.25; // src=8192px dist=2048px
const SPRW = 256*SMALLER;
const SPRH = 256*SMALLER;
const ASPRW = 512*SMALLER;
const ASPRH = 512*SMALLER;

var SS = {
    grass1:{x:0*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    grass2:{x:1*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    grass3:{x:2*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    grass4:{x:3*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    grass5:{x:4*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    grass6:{x:5*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    grass7:{x:6*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    grass8:{x:7*SPRW,y:0*SPRH,w:SPRW,h:SPRH},

    rock1:{x:8*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    rock2:{x:9*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    rock3:{x:10*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    rock4:{x:11*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    rock5:{x:12*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    rock6:{x:13*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    rock7:{x:14*SPRW,y:0*SPRH,w:SPRW,h:SPRH},
    rock8:{x:15*SPRW,y:0*SPRH,w:SPRW,h:SPRH},

    plant1:{x:0*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    plant2:{x:0*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    plant3:{x:0*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    plant4:{x:0*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    plant5:{x:0*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    plant6:{x:0*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    plant7:{x:0*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    plant8:{x:0*SPRW,y:1*SPRH,w:SPRW,h:SPRH},

    bluebell:{x:8*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    sign:{x:9*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    pot:{x:10*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    shroom:{x:11*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    fungi:{x:12*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    flower1:{x:13*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    wateringcan:{x:14*SPRW,y:1*SPRH,w:SPRW,h:SPRH},
    shovel:{x:15*SPRW,y:1*SPRH,w:SPRW,h:SPRH},

    avatar1:{x:0*ASPRW,y:1024*SMALLER,w:ASPRW,h:ASPRH},
    avatar2:{x:1*ASPRW,y:1024*SMALLER,w:ASPRW,h:ASPRH},
    avatar3:{x:2*ASPRW,y:1024*SMALLER,w:ASPRW,h:ASPRH},
    avatar4:{x:3*ASPRW,y:1024*SMALLER,w:ASPRW,h:ASPRH},
    avatar5:{x:4*ASPRW,y:1024*SMALLER,w:ASPRW,h:ASPRH},

    pin:{x:0*SMALLER,y:1784*SMALLER,w:512*SMALLER,h:768*SMALLER},

    logo:{x:2304*SMALLER,y:1792*SMALLER,w:1792*SMALLER,h:1792*SMALLER},
    scoreboard:{x:768*SMALLER,y:1792*SMALLER,w:1024*SMALLER,h:768*SMALLER},
    questUI:{x:0*SMALLER,y:2560*SMALLER,w:2304*SMALLER,h:896*SMALLER},
    buildbar:{x:0*SMALLER,y:3456*SMALLER,w:1792*SMALLER,h:640*SMALLER},
    buildbox:{x:1792*SMALLER,y:3456*SMALLER,w:512*SMALLER,h:640*SMALLER},
};

var screenCanvas, screenCTX, screenW, screenW2, screenH, screenH2, spritesheet;
var dragging, dragStartX, dragStartY, prevClientX, prevClientY, mouseDeltaX, mouseDeltaY;
var worldCanvas, worldCTX; 
var menuGUI;
var music, sfx, mute, volume;
var frame, camX, camY, zoom, zoomSmooth;
var userHasInteracted, up, right, down, left, mouseX, mouseY;
var things, numthings, folks, numfolks, hoveringFolk;
var x, y, i, num, debugDiv, ent;

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
        debugDiv.style.bottom = "0px";
        debugDiv.style.right = "0px";
    }

    menuGUI = document.getElementById('menu');

    screenCanvas = document.createElement("canvas");
    document.body.appendChild(screenCanvas);
    screenCTX = screenCanvas.getContext('2d');
    resize();

    worldCanvas = document.createElement("canvas");
    worldCanvas.width = WORLDW;
    worldCanvas.height = WORLDH;
    worldCTX = worldCanvas.getContext('2d');

    music = document.createElement("audio");
    music.autoplay = false;
    music.src = "ld46.mp3";

    spritesheet = new Image();
    spritesheet.src = 'spritesheet_small.png';//'ld46.png'; 
    spritesheet.onload = start;

    window.addEventListener("mousedown", onmousedown);
    window.addEventListener("mousemove", onmousemove);
    window.addEventListener("mouseup", onmouseup);
    window.addEventListener("keydown", onkeydown);
    window.addEventListener("keyup", onkeyup);
    window.addEventListener("wheel", onwheel);
    window.addEventListener("resize", resize);

}

function rndInt(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function rndRange(minimum, maximum) {
    return Math.random() * (maximum - minimum + 1) + minimum;
}

// random from 0..360 deg (0..2pi)
function randomAngleRadians() {
    return Math.random()*Math.PI*2;
}

// move randomly using car-like turns!
function aiExplore() {
    // choose a random direction to travel from time to time
    if (this.ExploreTimer==undefined) this.ExploreTimer = 30;
    if (this.ExploreAngle==undefined) this.ExploreAngle = this.aimAngleRadians;

    this.ExploreTimer--;
    if (this.ExploreTimer<0) {
        //if (DEBUGAI) console.log("aiExplore: time to change directions!");
        this.ExploreAngle = randomAngleRadians();
        this.ExploreTimer = rndInt(60,240);
    }

    
    // rotate in the shortet direction
    if(this.aimAngleRadians < this.ExploreAngle) {
        if(Math.abs(this.aimAngleRadians - this.ExploreAngle)<180)
        this.aimAngleRadians += AITURNSPD;
        else this.aimAngleRadians -= AITURNSPD;
    }
    else {
        if(Math.abs(this.aimAngleRadians - this.ExploreAngle)<180)
        this.aimAngleRadians -= AITURNSPD;
        else this.aimAngleRadians += AITURNSPD;
    }
    // stay in 0..360 range
    if (this.aimAngleRadians>Math.PI*2) this.aimAngleRadians -= Math.PI*2;
    if (this.aimAngleRadians<0) this.aimAngleRadians += Math.PI*2;



    // move in the direction we are facing
    this.x += AISPD * Math.cos(this.aimAngleRadians);
    this.y += AISPD * Math.sin(this.aimAngleRadians);
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
    var ent = { name:name, x:x, y:y, r:THINGRADIUS };
    things[numthings] = ent;
    numthings++;
    return ent;
}

function addFolk(name,x,y) {
    if (DEBUGMODE) console.log("addFolk " + name+","+x+","+y);
    var ent = { name:name, x:x, y:y, r:FOLKRADIUS, aimAngleRadians:0, ai:aiExplore };
    folks[numfolks] = ent;
    numfolks++;
    return ent;
}

function playButton() {
    if (DEBUGMODE) console.log("playButton");
    menuGUI.style.display = 'none';
}

function optionsButton() {
    if (DEBUGMODE) console.log("optionsButton");
    menuGUI.style.display = 'none';
}

function creditsButton() {
    if (DEBUGMODE) console.log("creditsButton");
    menuGUI.style.display = 'none';
}

function updateMousePos(e) { // in WORLD coords
    mouseX = Math.round(((-screenW2+e.clientX)*zoomSmooth)+camX);
    mouseY = Math.round(((-screenH2+e.clientY)*zoomSmooth)+camY);
}

function collide(pool,x,y) {
    for (i=0; i<pool.length; i++) {
        if (dist(pool[i].x,pool[i].y,x,y) < pool[i].r) { 
            return pool[i];
        }
    }
    return null;
}

function nearest(pool,x,y) {
    var closest = null;
    var closestDist = 999999999;
    var d = 0;
    for (i=0; i<pool.length; i++) {
        d = dist(pool[i].x,pool[i].y,x,y);
        if (d < closestDist) { 
            closestDist = d;
            closest = pool[i];
        }
    }
    return closest;
}

function allEntitiesInRange(pool,x,y,range) {
    var found = []; // warning: creates GC
    for (i=0; i<pool.length; i++) {
        if (dist(pool[i].x,pool[i].y,x,y) <= range) { 
            found.push(pool[i]);
        }
    }
    return found;
}

function onmousemove(e) {
    
    updateMousePos(e);
    mouseDeltaX = prevClientX - e.clientX;
    mouseDeltaY = prevClientY - e.clientY;
    if (dragging) {
        camX += mouseDeltaX*zoomSmooth;
        camY += mouseDeltaY*zoomSmooth;
        camX = Math.round(camX);
        camY = Math.round(camY);
    }
    prevClientX = e.clientX;
    prevClientY = e.clientY;

    /*
    var nearby = allEntitiesInRange(folks,mouseX,mouseY,200);
    if (nearby.length) {
        if (DEBUGMODE) console.log("nearby folks: "+nearby.length);
    }
    */
    
    hoveringFolk = collide(folks,mouseX,mouseY);
    if (hoveringFolk) {
        if (DEBUGMODE) console.log("hovering "+hoveringFolk.name+" at "+hoveringFolk.x.toFixed(1)+","+hoveringFolk.y.toFixed(1));
    }

}

function dist(x1,y1,x2,y2) {
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function onmouseup(e) {
    updateMousePos(e);
    dragging = false;
    // only if we did not drag far
    if ((Math.abs(dragStartX-e.clientX)<DRAGTHRESHOLD) ||
        (Math.abs(dragStartY-e.clientY)<DRAGTHRESHOLD))
     {
        addThing("flower1", mouseX, mouseY);

        renderWorld(); // redraw the giant world and all things[]
    }
}

function onmousedown(e) {
    if (DEBUGMODE) console.log("onmousedown " + e.clientX+","+e.clientY);
    
    updateMousePos(e);
    
    dragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;

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

function loadWorld() {
    if (DEBUGMODE) console.log("Loading world...");
    // load level
    //addThing("corner",0,0); // test
    //addFolk("corner",0,0); // test
    for (i=0; i<DEBUG_PROPS; i++) {
        addThing("grass"+(i%8+1),Math.random()*WORLDW,Math.random()*WORLDH);
        addThing("plant"+(i%8+1),Math.random()*WORLDW,Math.random()*WORLDH);
        addThing("rock"+(i%8+1),Math.random()*WORLDW,Math.random()*WORLDH);

    }
    renderWorld();
}

function step() {

    frame++;

    // scroll camera
    if (up) { camY -= CAMSPD; }
    if (down) { camY += CAMSPD; }
    if (left) { camX -= CAMSPD; }
    if (right) { camX += CAMSPD; }
    // stay in bounds
    if (camX<0) camX=0;
    if (camY<0) camY=0;
    if (camX>WORLDW-screenW) camX=WORLDW-screenW;
    if (camY>WORLDH-screenH) camY=WORLDH-screenH;

    // lerp zoom
    if (zoom>zoomSmooth) { zoomSmooth+=ZOOMSPD; }
    if (zoom<zoomSmooth) { zoomSmooth-=ZOOMSPD; }
    // close enough to snap
    if (Math.abs(zoom-zoomSmooth)<ZOOMSPD) zoomSmooth = zoom;

    if (Math.random()<0.01) {
        addFolk("avatar"+(numfolks%5+1),mouseX+Math.random()*400-200,mouseY+Math.random()*400-200);
    }

    for (i=0; i<numfolks; i++) {
        if (folks[i].ai) folks[i].ai();
    }

}

function renderScreen() {
    screenCTX.clearRect(0,0,screenW,screenH);
    
    // the static world terrain bg
    // unzoomed: works // screenCTX.drawImage(worldCanvas,camX,camY,screenW,screenH,0,0,screenW,screenH);
    // zoomed+uncentered // screenCTX.drawImage(worldCanvas,camX,camY,screenW*zoomSmooth,screenH*zoomSmooth,0,0,screenW,screenH);
    screenCTX.drawImage(worldCanvas,camX-(screenW2*zoomSmooth),camY-(screenH2*zoomSmooth),screenW*zoomSmooth,screenH*zoomSmooth,0,0,screenW,screenH);
    
    // all dynamic objects
    var spr, fx, fy;
    for (i=0; i<numfolks; i++) {
        //screenCTX.drawImage(spritesheet,folks[i].x-camX,folks[i].y-camY);
        
        // full size but in scaled position
        //screenCTX.drawImage(spritesheet,(folks[i].x-camX)/zoomSmooth+screenW2,(folks[i].y-camY)/zoomSmooth+screenH2);

        fx = (folks[i].x-camX)/zoomSmooth+screenW2;
        fy = (folks[i].y-camY)/zoomSmooth+screenH2;
        
        screenCTX.drawImage(spritesheet,SS.pin.x,SS.pin.y,SS.pin.w,SS.pin.h,
            fx,fy,PINW,PINH);

        // SS style
        spr = SS[folks[i].name];
        if (spr) {
            screenCTX.drawImage(spritesheet, spr.x, spr.y, spr.w, spr.h,
                fx,fy,FOLKW,FOLKH);
        }
    }

    // test
    //screenCTX.drawImage(spritesheet,screenW/2+Math.cos(frame/100)*screenW/3-camX,screenH/2-camY);

    // debug gui
    if (DEBUGMODE) {
        debugDiv.innerHTML = 
            "Frame:" + frame +
            " Cam:" + camX + "," + camY +
            " Mouse:" + mouseX + "," + mouseY;
    }

    renderGUI();

}

function renderGUI() {

    // logo middle
    screenCTX.drawImage(spritesheet,SS.logo.x,SS.logo.y,SS.logo.w,SS.logo.h,Math.round(screenW/2-LOGOW/2),Math.round(screenH/2-LOGOH/2),LOGOW,LOGOH);    
    // scoreboard top left
    screenCTX.drawImage(spritesheet,SS.scoreboard.x,SS.scoreboard.y,SS.scoreboard.w,SS.scoreboard.h,0,0,SCOREW,SCOREH);
    // buidbar bottom center
    screenCTX.drawImage(spritesheet,SS.buildbar.x,SS.buildbar.y,SS.buildbar.w,SS.buildbar.h,Math.round(screenW/2-BBARW/2),screenH-BBARH,BBARW,BBARH);
    // folks questUI right
    screenCTX.drawImage(spritesheet,SS.questUI.x,SS.questUI.y,SS.questUI.w,SS.questUI.h,screenW-QUESTW,0,QUESTW,QUESTH);

}

function renderWorld() { // slow
    if (DEBUGMODE) console.log("renderWorld with "+numthings+" things");
    worldCTX.clearRect(0,0,WORLDW,WORLDH);
    for (i=0; i<numthings; i++) {
        // entire bitmap, works:
        //worldCTX.drawImage(spritesheet,things[i].x,things[i].y);
        
        // spritesheet draw
        var spr = SS[things[i].name];
        if (spr) { // sprite exists?
            worldCTX.drawImage(spritesheet,spr.x,spr.y,spr.w,spr.h,things[i].x,things[i].y,spr.w,spr.h);
        } else {
            if (DEBUGMODE) console.log("unknown sprite name: "+ things[i].name);
        }

    }
}

function animate() {
    step();
    renderScreen();
    requestAnimationFrame(animate);
}

function start() { // done loading
    if (DEBUGMODE) console.log("START");
    loadWorld();
    animate();
}
