let mic, fft;

const drawState = Array(80);

function setup() {
  frameRate(5);

  createCanvas(1000, 1600);
  noFill();
  noStroke();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0, 1024);
  fft.setInput(mic);
}

function draw() {
  background(200);
  drawEngine();
  drawLabels()
}

function drawLabels(){
  fill(50);
  drawLabel("C3", 65)
  drawLabel("B3", 105)  
  drawLabel("C4", 118)
  drawLabel("D4", 130)
  drawLabel("G4", 170)
  drawLabel("C5", 235)
  drawLabel("G5", 345)
  drawLabel("C6", 455)
  drawLabel("G6", 673)
  drawLabel("C7", 895)
  drawLabel("G7", 1352)
}

function drawLabel(label, frequency){
  text(label,10,frequency)
}


function drawEngine() {
  if (drawState.length > 50) drawState.shift();
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
    fill(0, 0, 0);
  } else if (amp > 70) {
    fill(200, 0, 0);
  } else if (amp > 50) {
    fill(0, 255, 0);
  } else if (amp > 20) {
    fill(0, 0, 255);
  } else {
    fill(200, 200, 200);
  }
  ellipse(x * 12, y * 10, 5, 5);
}

function mouseClicked() {
  console.log(drawState);
  let spectrum = fft.analyze();
  console.log(spectrum);
}