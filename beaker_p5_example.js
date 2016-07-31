var d = beaker.newDeferred();

var sketch = function(s) {

  var system;

  s.setup = function() {
    s.createCanvas(720, 400);
    system = new ParticleSystem(s.createVector(s.width/2, 50));
  }

  s.draw = function() {
    s.background(51);
    system.addParticle();
    system.run();
  }

  s.mousePressed = function() {
    s.noLoop();
    d.resolve("done");
  }

  // A simple Particle class
  var Particle = function(position) {
    this.acceleration = s.createVector(0, 0.05);
    this.velocity = s.createVector(s.random(-1, 1), s.random(-1, 0));
    this.position = position.copy();
    this.lifespan = 255.0;
  };

  Particle.prototype.run = function() {
    this.update();
    this.display();
  };

  // Method to update position
  Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  };

  // Method to display
  Particle.prototype.display = function() {
    s.stroke(200, this.lifespan);
    s.strokeWeight(2);
    s.fill(127, this.lifespan);
    s.ellipse(this.position.x, this.position.y, 12, 12);
  };

  // Is the particle still useful?
  Particle.prototype.isDead = function(){
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  };

  var ParticleSystem = function(position) {
    this.origin = position.copy();
    this.particles = [];
  };

  ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
  };

  ParticleSystem.prototype.run = function() {
    for (var i = this.particles.length-1; i >= 0; i--) {
      var p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  };

}
define = undefined;  // Note, this breaks future language loading, see Issue #429
bkHelper.loadList(["https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.19/p5.min.js"],
                  function() {
                    document.getElementById("sketch").innerHTML = "";
                    var p = new p5(sketch, "sketch");
                  });

d
