function setup() {
  createCanvas(1500, 500);
  smooth();
  noLoop();
}

function bg() {
  background(0);
  const c = color('#fff');
  c.setAlpha(2);
  stroke(c);

  for (var x = 0; x < width; x += width / 45) {
    for (var y = 0; y < height; y += height / 15) {
      strokeWeight(2);
      line(x, 0, x, height);
      strokeWeight(1);
      line(0, y, width, y);
    }
  }
}

function grain() {
  const grainAmount = 15;
  
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    const grain = random(-grainAmount, grainAmount);
    pixels[i] = pixels[i] + grain;
    pixels[i + 1] = pixels[i + 1] + grain;
    pixels[i + 2] = pixels[i + 2] + grain;
  }
  updatePixels();
}

function draw() {
  bg();
  grain();
  // save("banner.png");
}
