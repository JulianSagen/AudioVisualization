let mic, fft;

const drawState = Array(80);

function setup() {
  frameRate(5);

  createCanvas(1000, 1600);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(200);
  drawEngine();
}

function drawEngine() {
  if (drawState.length > 80) drawState.shift();
  let spectrum = fft.analyze();
  if (spectrum) drawState.push(spectrum);
  drawFrequency();
}

function drawFrequency() {
  if (drawState.length > 1) {
    drawState.forEach((spectrum, time) => {
      if (spectrum) {
        spectrum.forEach((amplitude, frequency) => {
          if (amplitude > 10) {
            drawDot(time, frequency, amplitude);
          }
        });
      }
    });
  }
}

function drawDot(x, y, amp) {
  if (amp > 100) {
    stroke(0, 0, 0);
  } else if (amp > 70) {
    stroke(200, 0, 0);
  } else if (amp > 50) {
    stroke(0, 255, 0);
  } else if (amp > 20) {
    stroke(0, 0, 255);
  } else {
    stroke(200, 200, 200);
  }
  ellipse(x * 12, y * 10, 5, 5);
}

function mouseClicked() {
  console.log(drawState);
  let spectrum = fft.analyze();
  console.log(spectrum);
}