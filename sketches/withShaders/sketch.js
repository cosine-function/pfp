// size
const WIDTH_TO_HEIGHT_FACTOR = 0.7143;
const DEFAULT_SIZE = 1000;
const HEIGHT =
  window.innerWidth <= window.innerHeight
    ? window.innerWidth
    : window.innerHeight;
const WIDTH = HEIGHT * WIDTH_TO_HEIGHT_FACTOR;
const M = HEIGHT / DEFAULT_SIZE;

// basics
let SEED,
  canvas,
  activeShader,
  buffer,
  shaders = [],
  PARAMS = {};

// variable

// params
const colorPalettes = [
  {
    name: "colorPalette1",
    colors: ["#F64740", "#034732", "#18206F", "#F9A620"],
    bgColors: ["#EED5BE"],
  },
];

// utils
const randomNum = (min, max) => {
  return map(random(0, 1), 0, 1, min, max);
};

const randomChoice = (arr) => {
  return arr[floor(randomNum(0, arr.length))];
};

function weightedRandomChoice(options) {
  // inputType: [{value: "value", weight: 1}, ...]

  let sum = 0;
  for (let o of options) {
    sum += o.weight;
  }

  let choiceValue = randomNum(0, sum);
  for (let o of options) {
    if (o.weight >= choiceValue) {
      return o.value;
    }
    choiceValue -= o.weight;
  }
}

const pg3dToImg = (pg) => {
  const img = createImage(pg.width, pg.height);
  img.copy(
    pg,
    -pg.width / 2,
    -pg.height / 2,
    pg.width,
    pg.height,
    0,
    0,
    pg.width,
    pg.height
  );
  return img;
};

const pgToImg = (pg) => {
  const img = createImage(pg.width, pg.height);
  img.copy(pg, 0, 0, pg.width, pg.height, 0, 0, pg.width, pg.height);
  return img;
};

const initSeed = () => {
  SEED = random(999999);
  console.log("SEED_VALUE:", SEED);
  randomSeed(SEED);
  noiseSeed(SEED);
};

const setShader = (params, canvas = null) => {
  buffer.clear();
  buffer.resetShader();
  buffer.noStroke();
  buffer.shader(activeShader);
  activeShader.setUniform("resolution", [width, height]);
  activeShader.setUniform("time", millis() / 1000.0);
  activeShader.setUniform("seed", SEED);
  for (let p of params) {
    activeShader.setUniform(p.name, p.value);
  }
  if (canvas) {
    activeShader.setUniform("canvas", canvas);
  }
  buffer.rect(0, 0, buffer.width, buffer.height);
};

const drawOverlayShader = () => {
  setShader([], pg3dToImg(canvas));
  image(buffer, -width / 2, -height / 2);
};

// custom functions
const initParams = () => {
  const colorPalette = int(random(0, colorPalettes.length));

  PARAMS.colorPalette = colorPalette;
  PARAMS.bgColor = random(colorPalettes[colorPalette].bgColors);
  PARAMS.colors = colorPalettes[colorPalette].colors;
};

// p5js functions
function preload() {
  shaders.push(loadShader("shaders/texture.vert", "shaders/texture.frag"));
  shaders.push(loadShader("shaders/overlay.vert", "shaders/overlay.frag"));
  activeShader = shaders[0];
}

function keyPressed() {
  if (key === "s") {
    save(SEED + ".png");
  }
}

function windowResized() {
  const s = windowWidth <= windowHeight ? windowWidth : windowHeight;
  resizeCanvas(s * WIDTH_TO_HEIGHT_FACTOR, s);
}

function setup() {
  // setup for shaders
  createCanvas(int(WIDTH), int(HEIGHT), WEBGL);
  noStroke();
  buffer = createGraphics(width, height, WEBGL);
  canvas = createGraphics(width, height, WEBGL);

  pixelDensity(1);
  buffer.pixelDensity(1);
  canvas.pixelDensity(1);

  smooth();
  buffer.smooth();
  canvas.smooth();

  // inits
  initSeed();
  initParams();
}

function draw() {
  // example sketch
  canvas.push();
  canvas.translate(-width / 2, -height / 2, 0);

  canvas.noStroke();
  canvas.background(PARAMS.bgColor);

  // normal p5 rect
  canvas.fill(PARAMS.colors[0]);
  canvas.rect(0, 0, width / 2, width / 2);

  // shader texture rect
  activeShader = shaders[0];
  setShader([{ name: "color", value: color(PARAMS.colors[1])._array }]);
  canvas.texture(buffer);
  canvas.rect(width / 2, width / 2, width / 2, width / 2);

  canvas.fill(PARAMS.colors[0]);
  canvas.rect(0, (width / 2) * 2, width / 2, width / 2);

  canvas.pop();

  activeShader = shaders[1];
  drawOverlayShader();
}
