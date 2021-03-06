var sanders;
// array to store a reference to the word objects
var words = [];

//load the table of Clinton's words and frequencies
function preload() {
  sanders = loadTable("satop.csv", "header");
}

function setup() {
    createCanvas(720, 400);

    // iterate over the table rows
    for(var i=0; i<sanders.getRowCount(); i++){
        //- Get data out of the relevant columns for each row -//
        // From inspecting the data format it's
        // clear that where the docs say 'ID'
        // they mean 'index'; but you'd only use
        // this if you don't have a header row
        var word = sanders.get(i, "Words");
        var frequency = sanders.get(i, "Frequency");

        // create your Word object and add to
        // the words array for use later
        words[i] = new Word(word, frequency, width/2, height/2, 14);

    }

}

function draw() {
background(51);
  // Iterate through the Word objects and run their display method.
  // Calling noStroke once here to avoid unecessary repeated function calls
  noStroke();

  for(var i=0; i<words.length; i++) {
      words[i].display();
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
};
