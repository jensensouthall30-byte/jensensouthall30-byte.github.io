var s;
var scl = 20;
var food;

function setup() {
  createCanvas(400, 400);
  frameRate(10);

  s = new Snake();
  pickLocation();
}

function draw() {
  background(0, 150, 0);

  stroke(255);

  for (let x = 0; x <= width; x += scl) {
    line(x, 0, x, height);
  }

  for (let y = 0; y <= height; y += scl) {
    line(0, y, width, y);
  }

  if (s.eat(food)) {
    pickLocation();
  }

  s.death();
  s.update();
  s.show();

  fill(255, 0, 100);
  noStroke();
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW && s.yspeed !== 1) {
    s.xspeed = 0;
    s.yspeed = -1;
  } else if (keyCode === DOWN_ARROW && s.yspeed !== -1) {
    s.xspeed = 0;
    s.yspeed = 1;
  } else if (keyCode === LEFT_ARROW && s.xspeed !== 1) {
    s.xspeed = -1;
    s.yspeed = 0;
  } else if (keyCode === RIGHT_ARROW && s.xspeed !== -1) {
    s.xspeed = 1;
    s.yspeed = 0;
  }
}

function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);

  food = createVector(
    floor(random(cols)),
    floor(random(rows))
  );

  food.mult(scl);
}

function Snake() {
  this.x = 200;
  this.y = 200;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);

    if (d < 1) {
      this.total++;
      return true;
    }

    return false;
  };

  this.death = function() {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];

      if (dist(this.x, this.y, pos.x, pos.y) < 1) {
        this.total = 0;
        this.tail = [];
        this.x = 200;
        this.y = 200;
        this.xspeed = 1;
        this.yspeed = 0;
      }
    }
  };

  this.update = function() {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }

    if (this.total > 0) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    if (this.x >= width) this.x = 0;
    if (this.x < 0) this.x = width - scl;
    if (this.y >= height) this.y = 0;
    if (this.y < 0) this.y = height - scl;
  };

  this.show = function() {
    fill(255);
    noStroke();

    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }

    rect(this.x, this.y, scl, scl);
  };
}