function setup() {
  createCanvas(400, 400);
  smooth();
}

function draw() {
  background("#0D1117");
  strokeWeight(33);

  const nPoints = 300;
  for (i = 0; i < nPoints; i++) {
    stroke(lerpColor(color("#4D22C7"), color("#95FCF9"), i / nPoints));
    point(
      map(i, 0, nPoints, width / 4, width - width / 4),
      cos(i / 48 - 8) * (height / 10) + height / 2
    );
  }
  noLoop();

  // save("pfp.png");
}
