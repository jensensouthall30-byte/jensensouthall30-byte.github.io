let racerXs = [30, 30, 30, 30];
let startY = 50;
let yStep = 60;
let finishX = 540;
let max = 0;


function setup() {
  createCanvas(600, startY + yStep * racerXs.length);
}

function draw() {
  background(240);
  line(finishX, 0, finishX, height);
  for (let i = 0; i < racerXs.length; i++) {
    let y = startY + yStep * i;
    if (racerXs[i] < finishX) {
      racerXs[i] += random(1, 4);
      fill("white")
    } else {
      if ( i== 0){
        fill("green")
      } else {
        fill("red")
      }
    }
    circle(racerXs[i], y, 24);
  }
}