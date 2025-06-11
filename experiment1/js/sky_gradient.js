"use strict";

//where you left off: need to create an offset slider

//startingPos is an x,y vector which determines where the gradient starts

//detail means how much the colors interpolate between one another

//offsetX determines how far the next color is drawn on a new top layer to the left or right

//offsetY is the same as OffsetX only it controls the Y value of where the layer is drawn

//colors stores from drawn first to drawn last, what colors each portion should be in the form 
//of a 3D Vector, representing rgb values

let skyParts = {
  startingPos: [90, 0],
  detail: 20,
  offsetX: 0,
  offsetY: 40,  
  colors: [
    //night time
    [11, 24, 107],[11, 24, 107],[11, 24, 107],[22, 37, 129],[33, 49, 147],[58,72,160], 
    //sunset portion
    [156,86,172],[203,114,162], [249,168,53,],[245,108,36]
  ],
  shapeWidth: 80,
  shapeHeight: 80
}

function p3_preload() {}

function p3_setup() {
  background("cyan")
  noStroke()
  skyParts.startingPos[0] = width/2
  skyParts.shapeWidth = width*1.1
  skyParts.shapeHeight = height*0.4
  skyParts.offsetY = height*0.3
}

let worldSeed;
let slider = document.getElementById("offsetSlider");
let offsetGlobalY = 0
slider.oninput = function() {
  offsetGlobalY = this.value;
  document.getElementById("sliderText").textContent="Time: "+seed_to_time(worldSeed);

}

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed)
  worldSeed = 0 + (worldSeed%70)
  slider.value = worldSeed
  document.getElementById("sliderText").textContent="Time: "+seed_to_time(worldSeed);
}

function p3_draw_gradient() {
  //creates the gradient bases

  for (let i=0; i<skyParts.colors.length; i++){
    let col = skyParts.colors[i]
    for(let j = 0; j<skyParts.detail; j++){
      if (i != skyParts.colors.length-1){
        let from = color(skyParts.colors[i][0], skyParts.colors[i][1], skyParts.colors[i][2])
        let to = color(skyParts.colors[i+1][0], skyParts.colors[i+1][1], skyParts.colors[i+1][2])

        col = lerpColor(from, to, j/(skyParts.detail))
      }
      fill(col)
      ellipse(skyParts.startingPos[0]+skyParts.offsetX*i + skyParts.offsetX/skyParts.detail*j, 
        skyParts.startingPos[1]+skyParts.offsetY*i + skyParts.offsetY/skyParts.detail*j - slider.value*10, 
        skyParts.shapeWidth, skyParts.shapeHeight)
    }
  }
}

function seed_to_time(seed){
  let hour = (Math.abs(slider.value - 70)/70%12 * 10 + 5)%12
  let minute = hour
  while(minute>0){
    minute -= 1
  }
  minute *= 60
  minute += 60
  minute = int(minute)
  if (minute == 0 || minute == 60) {
    minute = "00"
  }
  if (minute<10 && minute != "00"){
    minute = String(0)+String(minute)
  }
  
  if (int(hour) == 0){
    hour = 12
  }
  
  let M = "PM"
  if(String(int(hour)) == "12" || String(int(hour)) == "1" || String(int(hour)) == "2"){
    M = "AM"
  }
  return String(int(hour))+":"+String(minute)+M
}





