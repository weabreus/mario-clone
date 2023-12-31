class Sprite {
  constructor({ canvas, canvasContext, position, imgSrc, frameRate = 1, frameBuffer = 8, scale = 1, offSet = 0 }) {
    this.offSet = offSet
    this.canvas = canvas;
    this.canvasContext = canvasContext;
    this.scale = scale;
    this.position = position;
    this.loaded = false;
    this.image = new Image();
    try {
      this.image.src = imgSrc;
    } catch (error) {
      this.image.src = "/mario-clone" + imgSrc.slice(1, imgSrc.length - 1);
    }
    
    this.image.onload = () => {
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = (this.image.height) * this.scale;
      this.loaded = true;
    };
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrames = 0;
  }

  draw() {
    if (!this.loaded) return;
    this.position.x += this.offSet;
    let cropbox = {
      position: {
        x: this.currentFrame * (this.image.width / this.frameRate),
        y: 0,
      },
      width: this.image.width / this.frameRate,
      height: this.image.height,
    };
    this.canvasContext.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.updateFrames();
  }

  updateFrames() {
    this.elapsedFrames++;
    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
}
