/**
 * Clickable Random Image Groups (v1.0.1)
 * GoToLoop (2016-Jun-02)
 *
 * forum.Processing.org/two/discussion/16944/
 * interactivity-changing-image-upon-click-in-p5js
*/
var clContext;

"use strict";

const STATEMENTS = 118, CATEGORY = 3, QTY = STATEMENTS/CATEGORY | 0,
      POLARITY = 3,
      states = Array(STATEMENTS), inds = Array(CATEGORY), cols = Array(POLARITY);

      //load the table of Clinton's words and frequencies
function preload() {
        clContext = loadTable("cl_context.csv", "header");
      }

function setup() {
  createCanvas(400, 647);
  background(51);
  // Calling noStroke once here to avoid unecessary repeated function calls
  noStroke();
  // iterate over the table rows
  for(var i=0; i<clContext.getRowCount(); i++){
      //- Get data out of the relevant columns for each row -//
      var inds = clContext.get(i, "category");
      var states = clContext.get(i, "statement");
      var cols = clContext.get(i, "polarity")
    }

  for (let i = 0; i < STATEMENTS; randomCategoryStates(i++));
}

function draw() {
  for(var i=0; i<states.length; i++) {
      inds[i].display();
  }
}

function mouseClicked() {
  if((mouseIsPressed < width) && (mouseIsPressed < height)) {
  randomCategoryStates(~~random(CATEGORY));
  redraw();
}

// Function to display statements by category in a random fashion
function randomCategoryStates(cat) {
  let idx = inds[cat], rnd;
  while ((rnd = ~~random(QTY)) == idx);
  inds[cat] = rnd;
}

// Function to align statements, categories, and polarity
function Statements() {
  this.x = x;
  this.y = y;
  this.cat = inds;
  this.statement = statement;
  this.polarity = polarity;
  // set a random x,y
  this.vx = random();
  this.vy = random();
}

// Attach pseudo-class methods to prototype;
// Maps polarity to color and x,y to random placement on canvas
Statement.prototype.display = function() {
  this.x += this.vx;
  this.y += this.vy;
  //var cols = map(this.polarity, -1, 1, #cd2626, #9400d3 #009acd); // Something appears wrong here, trying to map 3 categories to 3 hex colors
  var cols = map(this.polarity == -1, 205, 38, 38);
  var cols = map(this.polarity == 0, 148, 0, 211);
  var cols = map(this.polarity == 1, 0, 145, 205);
  fill(cols);
  textSize(14);
  text(this.statement, this.x, this.y);
};
