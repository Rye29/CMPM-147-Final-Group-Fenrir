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
  // redrawCanvas(); // Redraw everything based on new size
}

let tile_width_step_main; // A width step is half a tile's width
let tile_height_step_main; // A height step is half a tile's height

// Global variables. These will mostly be overwritten in setup().
let tile_rows, tile_columns;
let camera_offset;
let camera_velocity;

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
  // place our canvas, making it fit our container
  canvasContainer = $(containerId);
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent(containerId);
  // resize canvas is the page is resized

  if (window.p3_setup) {
    window.p3_setup();
  }

  let inputKey = $("#world-seed");
  // event handler if the input key changes
  inputKey.change(() => {
    rebuildWorld(inputKey.val());
  });

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
    window.p3_draw_gradient()
  }


  if (window.p3_drawAfter) {
    window.p3_drawAfter();
  }
}

