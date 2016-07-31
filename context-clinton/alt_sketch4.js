
var clContext;
var speed = 0.8;
var statements = [];
var canvas;

//load the table of Clinton's statements and their polarity
function preload() {
  clContext = loadTable("cl_context_rev.csv", "header");
}


function setup() {
  canvas = createCanvas(680, 420);
  canvas.mousePressed(inWidth);
  background(51);
  noStroke();
  // iterate over the table rows called in 'preload()' from .csv file
  for (var i = 0; i < clContext.getRowCount(); i++) {
    var statement = clContext.get(i, "statement");
    var polarity = clContext.get(i, "polarity");
    }
    var stateSplit = split(statement, "<br>");
    for (var j = 0; j < stateSplit.length; j++) {
      var stateJoin = join(stateSplit, "\n")
    }
    statements[i] = new Statement(polarity, stateJoin);
    console.log(typeof statements)
    console.log(typeof stateJoin)
    console.log(stateJoin)
    console.log(statements.length)
    console.log("length" in statements)
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
function Statement(polarity, stateJoin) {
  // Break up single-line statements in order to display as multiline
  //this.statement = split(statement, "<br>");
  this.stateJoin = stateJoin;
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

  if(this.x > width+10){
    this.x = -10
  }
  if(this.y > height+10) {
    this.y = -10
  }

  if(this.polarity == -1){
    fill(229,121,59);
  }
  else if(this.polarity == 1){
    fill(97,93,178);
  }
  textSize(14);
  text(this.stateJoin, this.x, this.y)
};


// Create function for hiding and showing statements
function inWidth() {
  width = width+5;
};
