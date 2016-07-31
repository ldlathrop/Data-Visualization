var trump;
// array to store a reference to the word objects
var bigrams = [];

//load the table of Trump's bigrams and polarities
function preload() {
  trump = loadTable("tr.bigram.pol.csv", "header");
}

function setup() {
    canvas = createCanvas(480, 480);
    canvas.mousePressed(inWidth);
    background(51);
    // iterate over the table rows
    for(var i=0; i<trump.getRowCount(); i++){
        //- Get data out of the relevant columns for each row -//
        var bigram = trump.get(i, "Bigram");
        var polarity = trump.get(i, "Polarity");
        // create your Bigram object and add to
        // the words array for use later
        bigrams[i] = new Bigram(bigram, polarity, width+5, height+5);
    }
}

function draw() {
if (mouseIsPressed) {
  background(51);
  // Iterate through the Word objects and run their display method.
  // Calling noStroke once here to avoid unecessary repeated function calls
  noStroke();

  for(var i=0; i<bigrams.length; i++) {
      bigrams[i].display();
  }
}
}

function Bigram(bigram, polarity, x, y) {
    this.x = x;
    this.y = y;
    this.bigram = bigram;
    this.polarity = polarity;
    // set a random speed
    this.vx = Math.random()*1-0.8;
    this.vy = Math.random()*1-0.8;
}

// Attach pseudo-class methods to prototype;
// unless using the new ES2015 class syntax
Bigram.prototype.display = function() {
  this.x += this.vx;
  this.y += this.vy;
  // Color statements according to postive or negative sentiment
  if(this.polarity == -1){
    fill(229,121,59);
  }
  else if(this.polarity == 1){
    fill(118,113,217);
  }
  textSize(12);
  text(this.bigram, this.x, this.y);
}

// Create functions for hiding and showing statements
function inWidth() {
  width = width+5;
};
