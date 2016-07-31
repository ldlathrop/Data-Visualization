// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 17-6: Stock Ticker

// An array of stock objects
var clContext;
var speed = 0.8;
var statements = [];
var statement;
var polarity;
var category;
var y;
var x = 0;

//load the table of Clinton's statements and their polarity
function preload() {
  clContext = loadTable("cl_context_rev.csv", "header");
}

function setup() {
  createCanvas(680, 420);
  background(51);
  noStroke();
  // iterate over the table rows called in 'preload()' from .csv file
  for (var i = 0; i < clContext.getRowCount(); i++) {
    var statement = clContext.get(i, "statement");
    var polarity = clContext.get(i, "polarity");
    var category = clContext.get(i, "category")
    statements[i] = new Statement(statement, polarity, category, x, y);

  // We space the stock quotes out according to textWidth()
  // and position them on the y-axis

}
}

function draw() {
  background(51);
  // Move and display all quotes
  for (var i = 0; i < statements.length; i++) {
    console.log(statements[i].setX(x));
    x = x + (statements[i].textW());
    console.log(statements[i].setY());
    for (var j = 0; j < statements.length; j++) {
      //x += speed;
      statements[j].move();
      statements[j].display();
  }
}
}

// A class to describe a stock quote

  function Statement(statement, polarity, category, x, y) {
    // Concatenate the name, value and some spaces
    this.statement = statement;
    this.category = category;
    this.polarity = polarity;
    this.y = y;
    this.displayTxt = this.statement + "   ";

    // A function to set x position
    this.setX = function(x_) {
        this.x = x_;
      }

  // A function to set y position
  this.setY = function() {

    if(this.category == 1){
      this.y = 20;
    } else if (this.category = 2) {
      this.y = 67;
    } else if (this.category = 3) {
      this.y = 114;
    } else if (this.category = 4) {
      this.y = 161;
    } else if (this.category = 5) {
      this.y = 208;
    } else if (this.category = 6) {
      this.y = 255;
    } else if (this.category = 7) {
      this.y = 302;
    } else if (this.category = 8) {
      this.y = 349;
    } else if (this.category = 9) {
      this.y = 396;
    } else {
      this.y = 443;
    }

    }


  // Scroll the quote and reset it when it gets far enough offscreen
  this.move = function() {
    this.x += speed;

  }

  // Display the quote
  this.display = function() {
    // Color statements according to postive or negative sentiment
    if(this.polarity == -1){
      fill(229,121,59);
    }
    else if(this.polarity == 1){
      fill(118,113,217);
    }
    textAlign(LEFT);
    noStroke();
    textSize(14);
    text(this.displayTxt, this.x);
  }

  // Return the width of the quote
  this.textW = function() {
    return textWidth(this.displayTxt);
  }
};
