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
  startingPos: [90, 100],
  detail: 4,
  offsetX: 40,
  offsetY: 0,  
  colors: [[0,0,0], [125,125,125],[255, 255, 255]]
}

function p3_preload() {}

function p3_setup() {
  background("cyan")
  
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_draw_gradient() {
  //creates the gradient bases
  for (let i=0; i<skyParts.colors.length; i++){
    let col = skyParts.colors[i]
    for(let j = 0; j<skyParts.detail; j++){
      if (i != skyParts.colors.length){
        let from = color(skyParts.colors[i][0], skyParts.colors[i][1], skyParts.colors[i][2])
        let to = color(skyParts.colors[i+1][0], skyParts.colors[i+1][1], skyParts.colors[i+1][2])

        col = lerpColor(from, to, j/(skyParts.detail))
      }
      fill(col)
      ellipse(skyParts.startingPos[0]+skyParts.offsetX*i + skyParts.offsetX/skyParts.detail*j, 
        skyParts.startingPos[1]+skyParts.offsetY*i, 
        80, 80)
    }
  }
}





