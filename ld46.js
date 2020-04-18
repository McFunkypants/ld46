// Ludum Dare 46 by McFunkypants
// a game made from scratch in 48hrs
// no libs, no engines, no assets, no old code

const DEBUGMODE = true;

var screenCanvas, screen, screenW, screenH;
var worldCanvas, world, worldW, worldH;
var music, sfx, mute, volume;
var frame, camX, camY, zoom;
var userHasInteracted, up, right, down, left, mousex, mousey;

window.addEventListener("load", init);

function init() {
    if (DEBUGMODE) console.log("init");

    frame = 0;
    camX = 0;
    camY = 0;
    zoom = 1;
    mousex = 0;
    mousey = 0;

    screenCanvas = document.createElement("canvas");
    document.body.appendChild(screenCanvas);
    screen = screenCanvas.getContext('2d');
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

function onclick(e) {
    if (DEBUGMODE) console.log("click " + e.clientX+","+e.clientY);
    mouseX = e.clientX;
    mouseY = e.clientY;
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
    screen.clearRect(0,0,screenW,screenH);
    screen.drawImage(spritesheet,screenW/2+Math.cos(frame/100)*screenW/3,screenH/2);
}

function animate() {
    step();
    render();
    requestAnimationFrame(animate);
}
