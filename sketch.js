let blackIntro = .5; //time of each section, in minutes
let fadeIn = .5;
let lineTime = 6.5;
let fadeOut = .5;
let lineTimeTotal = blackIntro + fadeIn + lineTime + fadeOut;

let fillValue = 0;
let growStart;
let startSec;
let running = 0;
let currentTime = 0;
let fat = 2;

let amount;
let length;

let x;

let fadeInGrain; // amount of fade in/out per frame
let fadeOutGrain;

let song1;
let song2;
let song3;

let song1Start = 1.5;
let song2Start = 5;
let song3Start =6;


function conversion() {
  blackIntro = blackIntro * 60;
  fadeIn = fadeIn * 60;
  lineTime = lineTime * 60;
  fadeOut = fadeOut * 60;
  fadeInGrain = 255 / (fadeIn * 60);
  fadeOutGrain = 255 / (fadeOut * 60);
  fadeOut = blackIntro + fadeIn + lineTime;
  lineTime = blackIntro + fadeIn;
  fadeIn = blackIntro;
  lineTimeTotal = lineTimeTotal * 60;

  song1Start = song1Start * 60;
  song2Start = song2Start * 60;
  song3Start = song3Start * 60;
  length = song3Start + song3.duration() + 30; //total seconds
  console.log("length " + length);
}

function preload() {
  song1 = loadSound("music/I love_hate you part 1.mp3");
  song2 = loadSound("music/I love_hate you part 2.mp3");
  song3 = loadSound("music/I love_hate you part 3.mp3");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  conversion();
  reset();
  noStroke();
  noCursor();
  frameRate(60);

  song1.playMode("untilDone");
  song2.playMode("untilDone");
  song3.playMode("untilDone");
}

function player() {

  if (currentTime > song1Start && !song1.isPlaying() && currentTime < song1Start + 10) {
    song1.play();
  } else if (currentTime > song2Start && !song2.isPlaying() && currentTime < song2Start + 10) {
    song2.play();
  } else if (currentTime > song3Start && !song3.isPlaying() && currentTime < song3Start + 10) {
    song3.play();
  }
}

function reset() {
  background(0);
  x = (width - fat) / 2;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  reset();
}

function draw() {
  if (running) {
    timer();
    lineDrawing();
    fader();
    player();
  } else {
    if (currentTime < length) {
      fill(255);
      ellipse(width / 2, height / 2, 100, 100);
    }
  }
}

function timer() {
  if (second() != startSec) {
    currentTime++;
    startSec = second();
    let minSec = currentTime
    console.log("Time: " + int(minSec / 60) + ":" + nf((minSec % 60), 2, 0));
  }
  if (currentTime > length) {
    running = 0;
  }
}

function lineDrawing() {
  background(0);
  fill(fillValue);
  if (currentTime < lineTimeTotal) {
    rect(x, 0, fat, height);
  }
}


function keyPressed() {


  if (keyCode == UP_ARROW) {
    fat = fat + 2;
    x = (width - fat) / 2;

  }
  if (keyCode == DOWN_ARROW) {
    fat = fat - 2;
    x = (width - fat) / 2;
    if (fat < 2) {
      fat = 2;
    }
  }

  if (key === " ") {
    if (running == 0) {
      running = 1;
      startSec = second();

    } else if (running == 1) {
      running = 0;
      song1.pause();
      song2.pause();
      song3.pause();
    }



  }
  if (key === "1") {
    currentTime = 0;
    growth = 1;
    fillValue = 0;
    console.log("start");
  }
  if (key === "2") {
    currentTime = fadeIn;
    fillValue = 0;
    console.log("fade in");
  }
  if (key === "3") {
    currentTime = song1Start;
    fillValue = 255;
    console.log("voice start");
  }
  if (key === "4") {
    currentTime = song2Start;
    fillValue = 255;
    console.log("rhythm start");
  }
  if (key === "5") {
    currentTime = song3Start;
    fillValue = 255;
    console.log("song start");
  }
  if (key === "6") {
    currentTime = fadeOut;
    fillValue = 255;
    console.log("fade out");
  }

}

function mousePressed() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function fader() {
  if (currentTime > fadeIn && currentTime < lineTime) {
    fillValue += fadeInGrain;

    if (fillValue > 255) {
      fillValue = 255;
    }
  }
  if (currentTime > fadeOut && currentTime < length) {
    fillValue -= fadeOutGrain;
    if (fillValue < 0) {
      fillValue = 0;
    }
  }
}
