var clinton;
var words; // Set up array for words in file
var frequency; // Set up array for frequency of each word
var fr = 20;
var clStream = [];

// Load the table of Clinton's words and frequencies
function preload() {
  clinton = loadTable("cltop.csv", "csv", "header");
}

function setup() {
  createCanvas(720, 400);
  background(51);
  frameRate(fr); // Set frame rate
  textFont("Cabin:600:latin"); // Set web font to be used
  // Set 'word' and 'frequency' arrays from 'clinton' table
  function setup() {
  console.log(clinton);
  for (var i = 0; i < clinton.getRowCount(); i++) {
    var frequency = clinton.getNum(i, "Frequency");
    var words = clinton.getString(i, "Words");
    console.log(frequency)
    console.log(words)

  // Create link to constructor
  clStream[j] = new Words ();
}
}

function draw() {
  //loop through each word
  for(var j = 0; j < words.length; j++) {
    clStream[j].move();
    clStream[j].display();
  }
}

// Create constructor function
function Words() {
  this.xpos = random(width);
  this.ypos = random(height);
  this.speed = random(3);

  this.word = words;
  this.frequency = frequency;

  this.move = function() {
    if(this.xpos > width) {
      this.xpos = -100; // start off screen
    }
    this.xpos = this.xpos + this.speed;
}
  this.display = function() {
    var freqGray = map(this.frequency, 8, 52, 102, 255);
    var freqSize = map(this.frequency, 8, 52, 12, 36)
    fill(freqGray);
    noStroke();
    textSize(freqSize);
    text(this.word, 0, 0);

  }
}
