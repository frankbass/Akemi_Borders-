// let blackIntro = 5; //time of each section, in minutes
// let fadeIn = 1;
// let lineTime = 14;
// let fadeOut = 2;

let blackIntro = .5; //time of each section, in minutes
let fadeIn = .5;
let lineTime = .5;
let fadeOut = .5;



let fillValue = 0;
let growStart;
let startSec;
let running = 0;
let currentTime = 0;
let fat = 2;


let amount;
let length;
// let margin = 20; // x distance from side
// let x = margin;
let x;

let fadeInGrain; // amount of fade in/out per fraim
let fadeOutGrain;

let song;
let voice;
let songStart = 1.1;
let voiceStart = .5;
let songEnd;

function conversion() {
  blackIntro = blackIntro * 60;
  fadeIn = fadeIn * 60;
  lineTime = lineTime * 60;
  fadeOut = fadeOut * 60;

  fadeInGrain = 255 / (fadeIn * 60);
  fadeOutGrain = 255 / (fadeOut * 60);
  length = blackIntro + fadeIn + lineTime + fadeOut; //total seconds
  fadeOut = blackIntro + fadeIn + lineTime;
  lineTime = blackIntro + fadeIn;
  fadeIn = blackIntro;
  //console.log("intro: 0" + ", fade in: " + fadeIn + ", line: " + lineTime + ", fadeOut: " + fadeOut + ", end: " + length);

  songStart = songStart * 60;
  voiceStart = voiceStart * 60;
	songEnd = songStart + song.duration();
}

function preload() {
	song = loadSound("music/Counting.mp3");
	voice = loadSound("music/Dry Ice 6.wav");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  conversion();
  reset();
  noStroke();
  noCursor();
  frameRate(60);

	// song.playMode("restart");
	// voice.playMode("restart");
}

function player() {

  if (currentTime > songStart && !song.isPlaying() && currentTime < songEnd) {
    song.play();
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
  }
}

function timer() {
  if (second() != startSec) {
    currentTime++;
    startSec = second();
    console.log("Time: " + currentTime);
  }
  if (currentTime > length) {
    running = 0;
  }
}

function lineDrawing() {
  background(0);
  fill(fillValue);
  if (currentTime < length) {
    rect(x, 0, fat, height);
  }
}


function keyPressed() {
  // if (keyCode === LEFT_ARROW) {
  //   x = 0 + margin;
  // } else if (keyCode === RIGHT_ARROW) {
  //   x = (width - margin - fat);
  // }

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
			song.pause();
    }
  }
  if (key === "1") {
    currentTime = 0;
    growth = 1;
    fillValue = 0;
  }
  if (key === "2") {
    currentTime = fadeIn;
    fillValue = 0;
  }
  if (key === "3") {
    currentTime = lineTime;
    fillValue = 255;
  }
  if (key === "4") {
    currentTime = fadeOut;
    fillValue = 255;
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
