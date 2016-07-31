var trump;
var x;
var y;
// array to store a reference to the word objects
var bigrams = [];

//load the table of Trump's bigrams and polarities
function preload() {
  trump = loadTable("trBigramsPol.csv", "header");
}

function setup() {
  createCanvas(640, 360);
  background(51);
  noStroke();

  for(var i=0; i<trump.getRowCount(); i++){
      //- Get data out of the relevant columns for each row -//
      var bigram = trump.get(i, "Bigrams");
      var posneg = trump.get(i, "PosNeg");
      bigrams[i] = new Bigram(bigram, posneg, x, y);
  }
  console.log(typeof bigram)
  console.log(typeof bigrams)
}

function draw() {
  // Set the left and top margin
  var margin = 10;
  translate(margin*4, margin*4);

  var gap = 10;

  for (var y = 0; y < height-gap; y += gap) {
    for (var x = 0; x < width-gap; x += gap) {
      for(var i=0; i<bigrams.length; i++) {
          console.log(bigrams[i].display());
      }
    }
  }
}

function Bigram(bigram, posneg, x, y) {
    this.x = x;
    this.y = y;
    this.bigram = bigram;
    this.posneg = posneg;
}

Bigram.prototype.display = function() {
  if(this.posneg == 0.0557){
    fill(255,54,54);
  }
  else if(this.posneg == 0.0602){
    fill(255,134,54);
  }
  else if(this.posneg == 0.1088){
    fill(255,174,54);
  }
  else if(this.posneg == 0.1174){
    fill(255,215,54);
  }
  else if(this.posneg == 0.9268){
    fill(255,255,54);
  }
  else if(this.posneg == 1.0789){
    fill(189,235,50);
  }
  else if(this.posneg == 2.3151){
    fill(45,215,45);
  }
  else if(this.posneg == 19.7155){
    fill(45,172,215);
  }
  else if(this.posneg == 21.2715){
    fill(45,116,215);
  }
  else if(this.posneg == 37.1158){
    fill(74,45,215);
  }
  else if(this.posneg == 38.6719){
    fill(158,45,215);
  }
  else if(this.posneg == 40.2279){
    fill(225,47,151);
  }
  textSize(11);
  textAlign(CENTER, CENTER);
  text(this.bigram, this.x, this.y);
}
