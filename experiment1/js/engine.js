// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
const containerId = "#canvas-container";

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  shootLayer = createGraphics(canvasContainer.width(), canvasContainer.height());
  shootLayer.clear();
  // redrawCanvas(); // Redraw everything based on new size
}

let tile_width_step_main; // A width step is half a tile's width
let tile_height_step_main; // A height step is half a tile's height

// Global variables. These will mostly be overwritten in setup().
let tile_rows, tile_columns;
let camera_offset;
let camera_velocity;

let stars = [];
let starCount = 30;

let shootingStar = null; // null first
let lastShoot = 0; // don't touch
let shootInterval = 1000; // 10 seconds
let shootLayer; // so it doesn't interrupt eclipse

class ShootingStar {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width * 0.2, width * 0.5);
    this.y = random(height * 0.05, height * 0.25);
    this.length = random(80, 150);
    this.speed = random(6, 10);
    this.alpha = 255;
  }

  update() {
    this.x += this.speed;
    this.y += this.speed;
    this.alpha -= 5;
  }

  draw() {
    shootLayer.stroke(255, 255, 0, this.alpha); // yellow
    shootLayer.strokeWeight(2); // between 2-4
    shootLayer.line(this.x, this.y, this.x - this.length, this.y - this.length);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

/////////////////////////////
// Transforms between coordinate systems
// These are actually slightly weirder than in full 3d...
/////////////////////////////

function preload() {
  if (window.p3_preload) {
    window.p3_preload();
  }
}

// setup() function is called once when the program starts
function setup() {
  console.log("Setup Running")
  // place our canvas, making it fit our container
  canvasContainer = $(containerId);
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent(containerId);
  // resize canvas is the page is resized

  shootLayer = createGraphics(width, height); // for shooting star behavior
  shootLayer.clear();

  if (window.p3_setup) {
    window.p3_setup();
  }

  let inputKey = $("#world-seed");
  // event handler if the input key changes
  inputKey.change(() => {
    rebuildWorld(inputKey.val());
  });

  //Clear the stars array and generate new stars
  generateStars();

  rebuildWorld(inputKey.val());

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

function rebuildWorld(key) {
  if (window.p3_worldKeyChanged) {
    window.p3_worldKeyChanged(key);
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {

  background("cyan")
  if (window.p3_drawBefore) {
    window.p3_drawBefore();
  }

  if(window.p3_draw_gradient){
    // !!! COMMENTED OUT FOR TESTING STARS !!!
    window.p3_draw_gradient()
  }

  for (let star of stars) {
    star.draw();
    star.checkMouseHover();
  }

  shootLayer.clear();

  if (millis() - lastShoot > shootInterval) {
    shootingStar = new ShootingStar();
    lastShoot = millis()
  }

  if (shootingStar) { // 
    shootingStar.update(); 
    shootingStar.draw(); 

    if (shootingStar.isDead()) { 
      shootingStar = null; 
    } 
  } 

  image(shootLayer, 0, 0); 

  if (window.p3_drawAfter) {
    window.p3_drawAfter();
  }

}

function mouseClicked() {
  // Check if any star is clicked
  for (let star of stars) {
    if (star.isHovered) {
      if (star.popup) {
        continue;
      }
      // Do something when the star is clicked
      console.log("Star clicked at: ", star.x, star.y);
      star.createPopup(canvas);
    }
    else if (star.popup) {
      // If the star is not hovered and has a popup, remove it
      star.removePopup();
    }
  }
}

function generateStars() {
  stars = [];
  for (let i = 0; i < starCount; i++) {
    let x = random(width);
    let y = random(height / 2, 0);
    let radius = random(2, 4); // Random radius between 2 and 4. Change later, they are big for testing

    let c = color('white');
    stars.push(new Star(x, y, radius, c));
  }
}
