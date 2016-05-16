/**
 * Word Frequencies (v2.03)
 * by  LDLathrop & BlindFish (2016-May-15)
 * mod GoToLoop
 *
 * forum.Processing.org/two/discussion/16600/
 * script-won-t-load-in-browser-but-no-error-message-in-console
 *
 * p5js.SketchPad.cc/sp/pad/view/ro.90xVTuJFcVi/latest
*/
 
"use strict";
 
const CSV_FILE  = 'cltop.csv',
      SKETCHPAD = '/static/uploaded_resources/p.19392/',
      HOSTED = false,
      CSV_PATH = (HOSTED && SKETCHPAD || '') + CSV_FILE;
 
let candidate, words;
 
function preload() {
  candidate = loadTable(CSV_PATH, 'header');
}
 
function setup() {
  createCanvas(500, 432);
  frameRate(60).noStroke().textAlign(LEFT, BASELINE);
  createWords(candidate);
}
 
function draw() {
  background(0);
  //for (let w of words)  w.script();
  for (const w of words)  w.script(); // Doesn't work under FF!
}
 
function mousePressed() {
  //for (let w of words)  w.pickSpd();
  for (const w of words)  w.pickSpd(); // Doesn't work under FF!
}
 
function createWords(csv) {
  const gap = Word.GAP + Word.MAX_SIZE;
  let minFreq = Number.POSITIVE_INFINITY, maxFreq = 0;
 
  words = Array(csv.getRowCount());
 
  csv.getRows().forEach((elem, idx) => {
    const word = elem.getString('Words'),
          freq = elem.getNum('Frequency');
 
    words[idx] = new Word(word, freq, width>>1, idx*gap + gap);
    minFreq = min(minFreq, freq), maxFreq = max(maxFreq, freq);
  });
 
  //for (let w of words)  w.mapFreq(minFreq, maxFreq);
  for (const w of words)  w.mapFreq(minFreq, maxFreq); // Doesn't work under FF!
}
 
class Word {
  static get MIN_SPD() { return .3; }
  static get MAX_SPD() { return 3; }
 
  static get MIN_GREY() { return 0o150; }
  static get MAX_GREY() { return 0xFF; }
 
  static get MIN_SIZE() { return 12; }
  static get MAX_SIZE() { return 36; }
 
  static get GAP() { return 4; }
 
  constructor (word, freq, x, y) {
    this.word = word, this.freq = freq;
    this.x = x, this.y = y;
    this.pickSpd();
  }
 
  static negOrPos() {
    return Math.random() < .5 && -1 || 1;
  }
 
  pickSpd(spd) {
    this.spd = spd || random(Word.MIN_SPD, Word.MAX_SPD) * Word.negOrPos();
  }
 
  mapFreq(minFreq, maxFreq) {
    this.freqGray = map(this.freq, minFreq, maxFreq, Word.MIN_GREY, Word.MAX_GREY);
    this.freqSize = map(this.freq, minFreq, maxFreq, Word.MIN_SIZE, Word.MAX_SIZE);
 
    textSize(this.freqSize);
    this.w = textWidth(this.word);
  }
 
  script() {
    this.bounce();
    this.display();
  }
 
  bounce() {
    (this.x += this.spd) >= width - this.w | this.x <= 0 && (this.spd *= -1);
  }
 
  display() {
    fill(this.freqGray);
    textSize(this.freqSize);
    text(this.word, this.x, this.y);
  }
}
