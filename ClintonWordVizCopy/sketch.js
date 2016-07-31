var message = "random characters flying home!";
// An array of Letter objects
var letters;

function setup() {
  createCanvas(400, 200);
  // Load the font
  textFont("Georgia", 20);

  // Create the array the same size as the String
  letters = [];
  // Initialize Letters at the correct x location
  var x = 50;
  for (var i = 0; i < message.length; i++) {
    letters[i] = new Letter(x, height/2, message.charAt(i));
    x += textWidth(message.charAt(i));
  }
}

function draw() {
  background(255);
  for (var i = 0; i < letters.length; i++) {
    // Display all letters
    letters[i].display();
}
    // If the mouse is pressed the letters shake
    // If not, they return to their original location
    if (mouseIsPressed) {
      letters[i].shake();
    } else {
      letters[i].home();
    }
  }


function Letter(x, y, letter) {
  // The object knows its original " home " location
  // As well as its current location
  this.homex = this.x = x;
  this.homey = this.y = y;
  this.letter = letter;
  this.theta = 0;

  // Display the letter
  this.display = function() {
    this.x += random(width);
    this.y += random(height);
    fill(0);
    //textAlign(LEFT);
    // User translate and rotate to draw the letter
    //push();
    //translate(this.x, this.y);
    rotate(this.theta);
    text(this.letter, this.x, this.y);
    //pop();
  }

  // Move the letter randomly
  this.shake = function() {
    this.x += random(-2,2);
    this.y += random(-2,2);
    this.theta += random(-0.1, 0.1);
  }

  // At any point, the current location can be set back to the home location by calling the home() function.
  this.home = function() {
    this.x = lerp(this.x, this.homex, 0.05);
    this.y = lerp(this.y, this.homey, 0.05);
    this.theta = lerp(this.theta, 0, 0.05);
  }

};
