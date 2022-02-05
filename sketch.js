// by Natasha MommyDesigner 
// 2022

let inc = 0.02;
let scl = 20;
let cols, rows;
let zoff = 0;
let particles = [];
let numParticles;
let sec;

function setup() {
  createCanvas(540,540);
  cols = floor(width/scl)+1;
  rows = floor(height/scl)+1;
  numParticles = 3000;
  seedParticles(numParticles);
  flowfield = new Array(cols*rows);
  background(255);
}


function seedParticles(num) {
  particles = [];
  for (let i = 0; i < num; i++) {
    particles[i] = new Particle();
  }
}

function draw() {

  //video capture
  //
  // if (frameCount === 1) {
  //   capturer.start()
  // }

  //regulation of particles length
  //
  //background(0, 0, 0, 20);

  let yoff = 0;
  for (let y=0; y < rows; y++) {
    let xoff = 0;
    for (let x=0; x < cols; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff,yoff,zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.1);
      flowfield[index] = v;
      xoff += inc; 
    }

  yoff += inc; 
  zoff += 0.0002;

  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show(); 
}

//video capture

  // if (frameCount < 60 * sec) {
  //   capturer.capture(canvas);
  // } else if (frameCount === 60 * sec)  {
  //   capturer.save();
  //   capturer.stop();    
  // }
}