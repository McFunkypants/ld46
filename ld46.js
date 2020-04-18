// Ludum Dare 46 by McFunkypants
// a game made from scratch in 48hrs
// no libs, no engines, no assets, no old code

var spritesheet, canvas, music, ctx, cw, ch;
var frame, up, right, down, left, mousex, mousey;
var clicked, debug = true;

window.addEventListener("load", init);

function resize() {
    if (debug) console.log("resize");
    cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;
}

function onclick(e) {
    if (debug) console.log("click " + e.clientX+","+e.clientY);
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!clicked) {
        if (debug) console.log("playing music");
        clicked = true;
        music.play();
    }
}

function onwheel(e) {
    if (debug) console.log("wheel " + e.deltaY);
}

function onkeydown(e) {
    if (debug) console.log("keydown " + e.keyCode);
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

function init() {
    if (debug) console.log("init");
    frame = 0;

    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
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

function step() {
    frame++;
}

function render() {
    ctx.clearRect(0,0,cw,ch);
    ctx.drawImage(spritesheet,cw/2+Math.cos(frame/100)*cw/3,ch/2);
}

function animate() {
    step();
    render();
    requestAnimationFrame(animate);
}
