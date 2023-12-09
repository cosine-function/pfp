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

const initSeed = () => {
  SEED = random(999999);
  console.log("SEED_VALUE:", SEED);
  randomSeed(SEED);
  noiseSeed(SEED);
};

// custom functions
const initParams = () => {
  const colorPalette = int(random(0, colorPalettes.length));

  PARAMS.colorPalette = colorPalette;
  PARAMS.bgColor = random(colorPalettes[colorPalette].bgColors);
  PARAMS.colors = colorPalettes[colorPalette].colors;
};

// p5js functions
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
  createCanvas(int(WIDTH), int(HEIGHT));
  noStroke();

  smooth();

  // inits
  initSeed();
  initParams();
}

function draw() {
  background(PARAMS.bgColor);
  fill(PARAMS.colors[0]);
  rect(width / 4, width / 4, width / 2, width / 2);
  noLoop();
}
