let img;
let video;
let videoWidth = 640;
let videoHeight = 480;
let canvWidth = 1440;
let canvHeight = 2560;
let widthScale = canvWidth/videoWidth;
let heightScale = canvHeight/videoHeight;
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
  
  //VIDEO
  video = createCapture(VIDEO, videoReady);
  // video.size(width / vScale, height / vScale);
  video.size(videoWidth, videoHeight);  

  for (let i = 0; i < 5500; i++) {
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
  
  background(0);
  if (segmentation) {
    // console.log("segment received");
    img = segmentation.backgroundMask;
    img.loadPixels();
  }
  streams.forEach(function (stream) {
    stream.render();
  });
  push();
  translate(width,0);
  scale(-1,1);
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
