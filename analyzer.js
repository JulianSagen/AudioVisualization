p5.disableFriendlyErrors = true; // disables FES

let mic, fft;

const drawState = Array(80);


function setup() {
  frameRate(100);

  createCanvas(1000, 8000);
  noFill();
  noStroke();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0, 4096);
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
  if (drawState.length > 10) drawState.shift();
  let spectrum = fft.analyze();
  if (spectrum) drawState.push(spectrum);
  drawFrequency();
}

function drawFrequency() {
  if (drawState.length > 1) {
    drawState.forEach((spectrum, time) => {
      if (spectrum) {
        spectrum.forEach((amplitude, frequency) => {
          if (amplitude > 50) {
            drawDot(time, frequency, amplitude);
          }
        });
      }
    });
  }
}

function drawDot(x, y, amp) {
  if(amp > 130){
    fill(255,40,0)
  } else if(amp > 120){
    fill(255,165,0)
  } else if(amp > 110){
    fill(255,255,0)
  } else if (amp > 105) {
    fill(0, 0, 0);
  } else if (amp > 100) {
    fill(0, 100, 0);
  } else if (amp > 80) {
    fill(0, 255, 0);
  } else if (amp > 70) {
    fill(0, 0, 255);
  } else {
    fill(350, 350, 350);
  }
  square(x * 5, y * 5, 5);
}

function mouseClicked() {
  console.log(drawState);
  let spectrum = fft.analyze();
  console.log(spectrum);
}