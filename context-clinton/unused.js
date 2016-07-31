[//splitStringAtSpace(statement, 100);
//String[] list = split(statement, '\\r\\n');
//var stateArr = splitTokens(statement, "\r\n");
//print(stateArr)
//j = 0,
//reduced = statement.reduce((p,c) => { p[j].length + c.length <= 150 ? p[j]+= c + "<br>"
//                                                               : p[++j] = c + "<br>";
  //                             return p;},[""]);
//console.log(reduced);
//console.log(reduced[0].length);
//console.log(reduced[1].length);
//statement = split(statement, ("<br>+"));
//console.log(statement.split("\r\n"));
//console.log(splitStringAtSpace(statements, 100))
//console.log(typeof statement)

//console.log(splitTokens);

// Function from Processing/p5 suggestions
function splitStringAtSpace(input, desiredLength) {
    // cast to String
    var inputString = String(input);
    var inputLength = inputString.length;
    // estimate of number of splits required
    var divisions = Math.floor(inputLength/desiredLength);
    var segments = [];
    var lastIndex = 0;
    var nextIndex = 0;

    for(var i=0; i<divisions; i++) {
        // find the index of the next space after the desired string length
        nextIndex = inputString.indexOf(" ", lastIndex + desiredLength);
        // take account of end of string
        nextIndex = nextIndex > -1 ? nextIndex : inputLength;

        var segment = inputString.substring(lastIndex, nextIndex).trim();

        if(segment) {
            segments.push(segment);
        }

        lastIndex = nextIndex;
    }

    return(segments);

}


var mutliLineState = createP(statement).addClass("text");
var texts = selectAll('.text');
for (var i=0; i<texts.length; i++) {
  var paragraph = texts[i].html();
  var splits = paragraph.split('<br>');
  var splitJoin = splits.join(splits, "\r\n");
  for (var j=0; j<splitJoin.length; j++) {
    var spannedState = createSpan(splitJoin[j]);
    var states = new Statement(polarity, spannedState);
    statements.push(states)


    Statement.prototype.run = function(stateJoin) {
      this.statements(stateJoin);
      this.update();
      this.borders();
      this.render();
    }

    Statement.prototype.applyForce = function(force) {
      // We could add mass here if we want A = F / M
      this.acceleration.add(force);
    }

    Statement.prototype.separation = function(stateJoin) {
      var sep = this.separate(stateJoin);   // Separation
      // Arbitrarily weight these forces
      sep.mult(1.5);
      // Add the force vectors to acceleration
      this.applyForce(sep);
    }

    // Method to update location
    Statement.prototype.update = function() {
      // Update velocity
      this.velocity.add(this.acceleration);
      // Limit speed
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      // Reset accelertion to 0 each cycle
      this.acceleration.mult(0);
    }

    // A method that calculates and applies a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    Statement.prototype.seek = function(target) {
      var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
      // Normalize desired and scale to maximum speed
      desired.normalize();
      desired.mult(this.maxspeed);
      // Steering = Desired minus Velocity
      var steer = p5.Vector.sub(desired,this.velocity);
      steer.limit(this.maxforce);  // Limit to maximum steering force
      return steer;
    }

    // Separation
    // Method checks for nearby boids and steers away
    Statement.prototype.separate = function(statements) {
      var desiredseparation = 25.0;
      var steer = createVector(0,0);
      var count = 0;
      // For every boid in the system, check if it's too close
      for (var i = 0; i < statements.length; i++) {
        var d = p5.Vector.dist(this.position,statements[i].position);
        // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
        if ((d > 0) && (d < desiredseparation)) {
          // Calculate vector pointing away from neighbor
          var diff = p5.Vector.sub(this.position,statements[i].position);
          diff.normalize();
          diff.div(d);        // Weight by distance
          steer.add(diff);
          count++;            // Keep track of how many
        }
      }
      // Average -- divide by how many
      if (count > 0) {
        steer.div(count);
      }

      // As long as the vector is greater than 0
      if (steer.mag() > 0) {
        // Implement Reynolds: Steering = Desired - Velocity
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity);
        steer.limit(this.maxforce);
      }
      return steer;
    }
