

var clContext;
var x;
var y;
//var inds = [];
//var statements = [];
//var polarity = [];
//var qty = statements/polarity | 0;

const STATEMENTS = 118, CATEGORY = 3, QTY = STATEMENTS/CATEGORY | 0,
      POLARITY = 3,
      statements = Array(STATEMENTS), inds = Array(CATEGORY), polarity = Array(POLARITY);

      //load the table of Clinton's words and frequencies
function preload() {
        clContext = loadTable("cl_context.csv", "header");
      }

function setup() {
  createCanvas(647, 400);
  background(51);
  // Calling noStroke once here to avoid unecessary repeated function calls
  noStroke();
  // iterate over the table rows
  for(var i=0; i<clContext.getRowCount(); i++){
      //- Get data out of the relevant columns for each row -//
      var inds = clContext.get(i, "category");
      var statements = clContext.get(i, "statement");
      var polarity = clContext.get(i, "polarity")
    }

  for (let i = 0; i < statements; randomCategoryStates(i++));
  // create your Statement object and add to
  // the statemens array for use later
  inds[i] = new Statement();


    //console.info(inds);
}

function draw() {
  if(mouseClicked == true){
  for(var i=0; i<inds.length; i++) {
      inds[i].display();
  }
}
}

function mouseClicked() {
  if((mouseX < w) && (mouseY < h) {
      randomCategoryStates(~~random(CATEGORY));
      redraw();
      return false;
  }
//missed closing brace:
}

// Function to display statements by a random category with each mouse click
function randomCategoryStates(group) {
  let idx = inds[group], rnd;
  while ((rnd = ~~random(QTY)) == idx);
  inds[group] = rnd;
}

// Function to align statements, categories, and polarity
//Statement or Statements?
function Statement() {
  this.x = x;
  this.y = y;
  this.xmax = 10;
  this.ymax = 4;
  this.cat = inds;
  this.statement = statements;
  this.polarity = polarity;
  // set a random x,y position for each statement
  this.dx = (Math.random()*this.xmax) * (Math.random() < .5 ? -1 : 1);
  this.dy = (Math.random()*this.ymax) * (Math.random() < .5 ? -1 : 1);
}
// Attach pseudo-class methods to prototype;
// Maps polarity to color and x,y to random placement on canvas
Statement.prototype.display = function() {
  this.x += this.dx;
  this.y += this.dy;
  var cols = map(this.polarity == -1, 205, 38, 38);
  var cols = map(this.polarity == 0, 148, 0, 211);
  var cols = map(this.polarity == 1, 0, 145, 205);
  fill(cols);
  textSize(14);
  text(this.statement, this.x, this.y);
};
