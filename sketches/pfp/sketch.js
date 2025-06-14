function setup() {
  createCanvas(1000, 1000);
  smooth();
  background("#000");
  noLoop();
}

function bg() {
  const nLines = 15;
  
  background(0);
  const c = color('#fff');
  c.setAlpha(4);
  stroke(c);
  strokeWeight(1.5);
  for (var x = 0; x < width; x += width / nLines) {
    for (var y = 0; y < height; y += height / nLines) {
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
}

function wave() {
  const nPoints = 9000;
  const amplitude = height / 6;
  const yOffset = height / 2;
  const startAngle = 1.5;
  const endAngle = 8.5 * PI;
  const colorOffset = 2000;

  strokeWeight(120);
  for (let i = 0; i < nPoints; i++) {
    stroke(lerpColor(color("#3D4EFF"), color("#FFF"), i / (nPoints + colorOffset)));
    
    let x = map(i, 0, nPoints, width / 4, width - width / 4);
    let angle = map(i, 0, nPoints, startAngle, endAngle);
    let y = cos(angle) * amplitude + yOffset;
    
    point(x, y);
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
  wave();
  grain();
  // save("pfp.png");
}