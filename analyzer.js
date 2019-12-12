let mic, fft;
var i = 0;

let drawState = []

function setup() {
    createCanvas(1000, 800);
    noFill();
  
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    frameRate(100)
  }
  
  function draw() {
    background(200);
    drawEngine()
  }

  function drawEngine(){
    drawState = deleteOutdated(drawState)
    let spectrum = fft.analyze();
    let filtered = filterAmplitude(spectrum)
    filtered.forEach(element => spawn(element.freq))
    drawFrequency()
    drawState = drawState.map(element => {
        return {
        timeAlive: (element.timeAlive - 2),
        frequency: element.frequency
    }})
  }

  function deleteOutdated(recorded){
     return recorded.filter(element => element.timeAlive > 10 )
  }

  function filterAmplitude(spectrum){
    return spectrum.reduce((resp,strenght, freq) =>{ 
        if (strenght > 100){ 
           resp.push({freq, strenght})
        } 
        return resp
    },[])
  }
  function spawn(frequency){
    drawState.push({
        timeAlive: 800,
        frequency: frequency
    })
  }
  function drawFrequency(){
      drawState.forEach(element => drawDot(element.timeAlive, element.frequency))
  }

  function mouseClicked() {
    console.log(drawState)
    let spectrum = fft.analyze();
    console.log(filterAmplitude(spectrum))
  }

  function drawDot(x, y) {
    ellipse(x, y*8, 5, 5);
  }