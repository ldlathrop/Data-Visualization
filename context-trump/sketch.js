

var trContext;
var speed = 0.5;
var statements = [];
var category = [];
var canvas;

      //load the table of Clinton's words and frequencies
function preload() {
        trContext = loadTable("tr_context.csv", "header");
      }

function setup() {
  canvas = createCanvas(777, 480);
  canvas.mousePressed(inWidth);
  background(51);
  // Calling noStroke once here to avoid unecessary repeated function calls
  noStroke();
  // iterate over the table rows
  for (var i = 0; i < clContext.getRowCount(); i++) {
    var category = clContext.get(i, "category");
    var statement = clContext.get(i, "statement");
    var polarity = clContext.get(i, "polarity");
    statements[i] = new Statement(category, polarity, statement);
  }
}

function draw() {
  if (mouseIsPressed) {
    background(51);
    for (var i = 0; i < statements.length; i++) {
      statements[i].display();
    }
  }
}

// Function to align statements, categories, and polarity
function Statement(category, polarity, statement) {
  this.category = category;
  this.statement = statement;
  this.polarity = polarity;
  this.x = random(width);
  this.y = random(height);
  this.dx = random(-speed, speed);
  this.dy = random(-speed, speed);
}
// Attach pseudo-class methods to prototype;
// Maps polarity to color and x,y to random placement on canvas
Statement.prototype.display = function() {
  this.x += this.dx;
  this.y += this.dy;
  if(this.x > width+20){
    this.x = -20
  }
  if(this.y > height+10) {
    this.y = -10
  }
  if(this.polarity == -1){
    fill(229,121,59);
  }
  else if(this.polarity == 1){
    fill(39,124,58);
  }
  else{
    fill(148, 0, 211);
  }
  textSize(13);
  text(this.statement, this.x, this.y);
};

// Create functions for hiding and showing statements
function inWidth() {
  width = width+5;
}
