"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

let skyParts = {
  startingPos: [0, 100],
  offsetX: 40,
  offsetY: 0,  
  colors: ['red', 'blue']
}

function p3_preload() {}

function p3_setup() {
  background(100)
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_draw_gradient() {
  for (let i=0; i<skyParts.colors.length; i++){
    ellipse(skyParts.startingPos[0]+skyParts.offsetX*i, 
      skyParts.startingPos[1]+skyParts.offsetY*i, 
      80, 80)
  }
}





