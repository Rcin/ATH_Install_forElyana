function Letter(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value = 0;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 55));

  this.setToRandomLetter = function () {
    let charType = round(random(0, 9));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        //0620, 0641, 0660 for unicode letters
        this.value = String.fromCharCode(0x0620 + round(random(0, 32)));
      } else if (charType >= 1) {
        this.value = String.fromCharCode(0x0641 + round(random(0, 10)));
      } else {
        this.value = String.fromCharCode(0x0660 + round(random(0, 9)));
      }
    }
    // console.log(frameCount);
  };

  this.rain = function () {
    //this would move the lines from top to bottom of the canvas
    // this.y = (this.y >= height) ? 0 : this.y += this.speed;

    this.x = this.x <= 0 ? width : (this.x -= this.speed);
  };
}

function Stream() {
  this.letters = [];
  this.totalLetters = round(random(2, 65));
  this.speed = random(0.5, 1.5);

  this.generateLetters = function (x, y) {
    let opacity = 255;
    let first = round(random(0, 0)) == 1;
    for (let i = 0; i <= this.totalLetters; i++) {
      letter = new Letter(x, y, this.speed, first, opacity);
      letter.setToRandomLetter();
      this.letters.push(letter);
      opacity -= 255 / this.totalLetters / fadeInterval;
      //makes the sentence horizontal
      x += letterSize;
      // first = false;
    }
  };

  this.render = function () {
    this.letters.forEach(function (letter) {
      if (letter.first) {
        fill(255, 255, 255, letter.opacity);
      } else {
        fill(255, 255, 255, letter.opacity);
      }
      text(letter.value, letter.x, letter.y);
      letter.rain();
      letter.setToRandomLetter();
    });
  };
}
