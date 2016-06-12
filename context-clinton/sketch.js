//"use strict";

var clContext;
var speed = 0.8;
var statements = [];
var canvas;
//j = 0;



      //load the table of Clinton's words and frequencies
function preload() {
        clContext = loadTable("cl_context_rev.csv", "header");
      }

function setup() {
  canvas = createCanvas(680, 420);
  canvas.mousePressed(inWidth);
  background(51);
  // Calling noStroke once here to avoid unecessary repeated function calls
  noStroke();
  // iterate over the table rows
  for (var i = 0; i < clContext.getRowCount(); i++) {
    var statement = clContext.get(i, "statement");
    var polarity = clContext.get(i, "polarity");
    splitStringAtSpace(statement, 100);
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
    console.log(statement.split("\r\n"));
console.log(typeof statement)
console.log(splitStringAtSpace(statement, 100))
//console.log(splitTokens);

    statements[i] = new Statement(polarity, statement);


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

// Function to align statements, categories, and polarity
function Statement(polarity, statement) {
  //this.statement = splitTokens(statement, "\r\n");
  this.statement = statement;
  this.polarity = polarity;
  this.x = random(width/2);
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
    fill(39,124,58);
  }
  textSize(14);
  text(this.statement, this.x, this.y);
}

// Create functions for hiding and showing statements
function inWidth() {
  width = width+5;
};
