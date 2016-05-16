// Create constructor function
function Words(tempX, tempY) {
  this.x = tempX;
  this.y = tempY;
  //this.size = tempSize;
  this.word = words;
  this.frequency = frequency;
  this.speed = 2;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  this.display = function() {
    var freqGray = map(this.frequency, 8, 52, 102, 255);
    var freqSize = map(this.frequency, 8, 52, 12, 36)
    fill(freqGray);
    noStroke();
    textSize(freqSize);
    text(this.word, 0, 0);

  };
}
