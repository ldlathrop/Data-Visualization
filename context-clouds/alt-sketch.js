var category = [];
var clContext;

//load the table of Clinton's words and frequencies
function preload() {
  clContext = loadTable("cl_context.csv", "header");
}

function setup() {
  createCanvas(400, 647);
  // iterate over the table rows
  for(var i=0; i<clContext.getRowCount(); i++){
      //- Get data out of the relevant columns for each row -//
      var cat = clContext.get(i, "category");
      var statement = clContext.get(i, "statement");
      var polarity = clContext.get(i, "polarity")
    }
}

function draw() {
  background(51);
  // Calling noStroke once here to avoid unecessary repeated function calls
  noStroke();
}

function Statements(cat, statement, x, y, transparency) {
  this.x = x;
  this.y = y;
  this.cat = cat;
  this.statement = statement;
  this.polarity = polarity;
  // set a random x,y
  this.vx = random();
  this.vy = random();
}

// Attach pseudo-class methods to prototype;
// unless using the new ES2015 class syntax
Statement.prototype.display = function() {
  this.x += this.vx;
  this.y += this.vy;
  var cols = map(this.polarity, -1, 1, #cd2626, #9400d3 #009acd);
  fill(cols);
  textSize(14);
  text(this.statement, this.x, this.y);
};
