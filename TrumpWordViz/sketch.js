var trump;
// array to store a reference to the word objects
var words = [];

//load the table of Clinton's words and frequencies
function preload() {
  trump = loadTable("trtop.csv", "header");
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.mousePressed(inWidth);
    // iterate over the table rows
    for(var i=0; i<trump.getRowCount(); i++){
        //- Get data out of the relevant columns for each row -//
        var word = trump.get(i, "Words");
        var frequency = trump.get(i, "Frequency");
        // create your Word object and add to
        // the words array for use later
        words[i] = new Word(word, frequency, width/2, height/2, 14);
    }
}

function draw() {
if (mouseIsPressed) {
  background(51);
  // Iterate through the Word objects and run their display method.
  // Calling noStroke once here to avoid unecessary repeated function calls
  noStroke();

  for(var i=0; i<words.length; i++) {
      words[i].display();
  }
}
}

function Word(word, frequency, x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.word = word;
    this.frequency = frequency;
    // set a random speed
    this.vx = Math.random()*2-1;
    this.vy = Math.random()*2-1;
}

// Attach pseudo-class methods to prototype;
// unless using the new ES2015 class syntax
Word.prototype.display = function() {
  this.x += this.vx;
  this.y += this.vy;
  var freqGray = map(this.frequency, 8, 52, 102, 255);
  var freqSize = map(this.frequency, 8, 52, 12, 48)
  fill(freqGray);
  textSize(freqSize);
  text(this.word, this.x, this.y);
}

// Create functions for hiding and showing statements
function inWidth() {
  width = width+5;
};
