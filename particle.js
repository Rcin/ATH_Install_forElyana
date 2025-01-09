// based on Daniel Shiffman's video - https://youtu.be/vqE8DMfOajk

let slider;

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.r = random(5, 100);
  // this.r = random(5, 20);

  this.update = function () {
    this.x += random(-2, 2);
    this.y += random(-2, 2);

    this.x = constrain(this.x, 0, canvWidth);
    this.y = constrain(this.y, 0, canvHeight);
  };

  this.show = function () {
    if (img) {
      noStroke();
      
      let px = floor(this.x);
      let py = floor(this.y);

      let d = pixelDensity();

      let index = 4 * ((videoWidth * (py)) + (px));

      let col = [
        img.pixels[index],
        img.pixels[index + 1],
        img.pixels[index + 2],
        img.pixels[index + 3],
      ];

      if (col[0] === 0 && col[1] === 0 && col[2] === 0) {
        return;
      }

      
      
      fill(col[0], col[1], col[2], random(70, 90));
      ellipse(this.x*widthScale, this.y*heightScale, this.r * 2, this.r * 2);
      
      // let n = noise(millis()/1000)

      // stroke(col[0], col[1], col[2], 20);
      // strokeWeight(5)
      // line(width, height, random(0,width), random(0, height));
    }
  };
}
