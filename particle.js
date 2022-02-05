function Particle() {
	this.pos = createVector(random(width),random(height));
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.maxspeed = 2;
	this.prevPos = this.pos.copy();

	this.update = function() {
		this.vel.add(this.acc.mult(0.5));
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.follow = function(vectors) {
		let x = floor(this.pos.x / scl);
		let y = floor(this.pos.y / scl);
		let index = x + y * cols;
		let force = vectors[index];
		this.applyForce(force);
	}


	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.show = function(){
		colorMode(RGB, 255, 255, 255, 100);

		let red = map(this.pos.y+this.pos.x, 0, this.maxspeed*2, 0,150);
        let blue = map(this.vel.x+this.vel.y, 0,this.maxspeed*2, 150, 0);
        stroke(red, 5, blue, 100);
        strokeWeight(map(this.vel.y + this.vel.x, 0, this.maxspeed*2, 10, 20));
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		this.updatePrev();
		
	}

	this.updatePrev = function() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;

	}


	this.edges = function() {

		if (this.pos.x > width) {
				this.pos.x = 0;
				this.updatePrev();
			}
		if (this.pos.x < 0) {
				this.pos.x = width;
				this.updatePrev();
			}
		if (this.pos.y > height) {
				this.pos.y = 0;
				this.updatePrev();
			}
		if (this.pos.y < 0) {
				this.pos.y = height;
				this.updatePrev();
			}
	}
}