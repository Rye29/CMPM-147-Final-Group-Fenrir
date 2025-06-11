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

let stars = [];
let starCount = 30;

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

  if (window.p3_setup) {
    window.p3_setup();
  }

  let inputKey = $("#world-seed");
  // event handler if the input key changes
  inputKey.change(() => {
    rebuildWorld(inputKey.val());
  });

  let starInput = $("#starSlider");
  let starText = $("#starCountText");
  starInput.change(() => {
    starCount = starInput.val();
    starText.text(starCount);
    adjustStarCount(starCount);
  });
  starInput.val(starCount);
  starText.text(starCount);

  rebuildWorld(inputKey.val());

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

function rebuildWorld(key) {
  //Update stars when the world key changes
  randomSeed(calculateSeedFromKey(key));
  starCount = floor(random(20,40));
  $("#starSlider").val(starCount);
  $("#starCountText").text(starCount);
  generateStars();

  $('#grassColorPicker').val('#969900') //reset grass color

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

  if (window.draw_grass) {
    window.draw_grass();
  }
  
  if ($("#starsCheckbox").is(":checked")) {
    for (let star of stars) {
      star.draw();
      star.checkMouseHover();
    }
  }

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
    let y = random(height / 1.5, 0);
    let radius = random(2, 4); // Random radius between 2 and 4. Change later, they are big for testing

    let c = color('white');
    stars.push(new Star(x, y, radius, c));
  }
}

function adjustStarCount(newCount) {
  if (stars.length > newCount) {
    stars.splice(newCount); // Remove excess stars
  }
  else if (stars.length < newCount) {
    for (let i = stars.length; i < newCount; i++) {
      let x = random(width);
      let y = random(height / 2, 0);
      let radius = random(2, 4); // Random radius between 2 and 4. Change later, they are big for testing

      let c = color('white');
      stars.push(new Star(x, y, radius, c));
    }
  }
}

function calculateSeedFromKey(key) {
  let seed = 0;
  for (let i = 0; i < key.length; i++) {
    seed += key.charCodeAt(i) * (i + 1);
  }
  return seed;
}