let racerXs = [30, 30, 30, 30];
let startY = 50;
let yStep = 60;
let finishX = 1240

function setup() {
  createCanvas(1300, startY + yStep * racerXs.length);
}

function draw() {
  background(240);
  line(finishX, 0, finishX, height);
  for (let i = 0; i < racerXs.length; i++) {
    let y = startY + yStep * i;
    if (racerXs[i] < finishX) {
      racerXs[i] += random(1, 2);
    }
    circle(racerXs[i], y, 24);
  }
}