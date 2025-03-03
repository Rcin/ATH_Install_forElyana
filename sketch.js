let img;
let video;
let videoWidth = 640;
let videoHeight = 480;
let canvWidth = 1440;
let canvHeight = 2560;
let widthScale = canvWidth/videoWidth; //used in particles
let heightScale = canvHeight/videoHeight; //used in particles
let bodypix;
let segmentation;
// let vScale = 12;
let particles = [];
// let imp;
let streams = [];
let fadeInterval = 1.2;
let letterSize = 20;
const options = {
  outputStride: 32,
  segmentationThreshold: 0.5,
};


function preload() {
  bodypix = ml5.bodyPix(options);
}
function setup() {
  createCanvas(canvWidth, canvHeight);
  // createCanvas(windowWidth, windowHeight);
  // angleMode(DEGREES);

  //VIDEO
  video = createCapture(VIDEO,  videoReady);
  // video.size(width / vScale, height / vScale);
  
  video.size(videoWidth, videoHeight);  


  for (let i = 0; i < 1200; i++) {
    particles[i] = new Particle(random(videoWidth), random(videoHeight));
  }
  video.hide();
  
  
  //TEXT
  let x = 0;
  //TEXT
  for (let x = 0; x <= width; x += letterSize) {
    let stream = new Stream();
    stream.generateLetters(x, random(-50, height));
    streams.push(stream);
  }
  textSize(letterSize);
}

function videoReady() {
  bodypix.segment(video, gotResults);
}

function draw() {
  frameRate(20);
  background(0);
  if (segmentation) {
    // console.log("segment received");
    img = segmentation.backgroundMask;
    img.loadPixels();
  }
  streams.forEach(function (stream) {
    stream.render();
  });
  // image(video, 0, 0, videoWidth, videoHeight);

  push();
  translate(width, -height/4);
  // translate(0, -height/3);
  scale(-0.9, 0.9);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
  
  pop();
  
}
function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  segmentation = result;
  bodypix.segment(video, gotResults);
}

