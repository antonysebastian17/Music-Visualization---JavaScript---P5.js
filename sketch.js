// 1.https://www.bensound.com/ - Audio files that were sliced was used form this website
//Ben Sound - All That
//Ben Sound - Funny song

//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
//variables for rotatingsquare.js
var rotateThresh;
var squareSize;
var noiseStep;
var progThresh;
var seedThresh;
var spectrumWidth;
var speed;
var prog;
var gui;
//Circle size variables for changingcircle.js
var circle1Size;
var circle2Size;
var circle3Size;
var circle4Size;

var padColor = [];
for(var i=0;i<16;i++)
{
    padColor.push(0);
}
var writtenText = "QWERTYASDFGZXCVB";

var crackers_array=[];
var crack_speed;

//var wavelength;
//var amplitude;

function preload(){
    //Loading music
    soundFormats('mp3','wav');
	sound = loadSound('assets/stomper_reggae_bit.mp3');
    //Initial values for rotating squares
    squareSize=2;
    rotateThresh = 67;
    progThresh = 180;
	seedThresh = 100;
    noiseStep = 0.01;
    prog = 0;
    speed = 0.7;
    spectrumWidth = (width/5)*3;
    
    //Initial circle size values
    circle1Size=0.4;
    circle2Size=0.5;
    circle3Size=0.7;
    circle4Size=0.9;
    
    //Initial values for barwave.js for GUI
    bar_p1=100;
    amplitude=100;
    bar_p3=30;
    waveSpeed=25;
    wavelength=20;
    
    //Loading drum sounds
    chopOne=loadSound('assets/bensound-allthat1.mp3');
    chopTwo=loadSound('assets/bensound-allthat2.mp3');
    chopThree=loadSound('assets/bensound-allthat3.mp3');
    chopFour=loadSound('assets/bensound-allthat4.mp3');
    chopFive=loadSound('assets/bensound-allthat5.mp3');
    chopSix=loadSound('assets/bensound-allthat6.mp3');
    chopSeven=loadSound('assets/bensound-allthat7.mp3');
    chopEight=loadSound('assets/bensound-allthat8.mp3');
    chopNine=loadSound('assets/bensound-funnysong1.wav');
    chopTen=loadSound('assets/bensound-funnysong2.wav');
    chopEleven=loadSound('assets/bensound-funnysong3.wav');
    chopTwelve=loadSound('assets/bensound-funnysong4.wav');
    chopThirteen=loadSound('assets/bensound-funnysong5.wav');
    chopFourteen=loadSound('assets/bensound-funnysong6.wav');
    chopFifteen=loadSound('assets/bensound-funnysong7.wav');
    chopSixteen=loadSound('assets/bensound-funnysong8.wav');
    
    //Initial value for speed of fireCracks for GUI
    fireCrackSpeed=5;
}


function error(err){
    console.log("Error");
    alert("Error: " + err);
}


function setup(){
	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();
    
	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
     vis.add(new changingcircle());
     vis.add(new rotatingsquare());
     vis.add(new drumpads());
     vis.add(new barwave());
     
     
    
    //Create GUI
    gui = createGui('Audio Visualizer');
    
    //GUI controls for changingcircle
    sliderRange(0.2,1,0.1);
    gui.addGlobals('circle1Size');
    sliderRange(0.2,1,0.1);
    gui.addGlobals('circle2Size');
    sliderRange(0.2,1,0.1);
    gui.addGlobals('circle3Size');
    sliderRange(0.2,1,0.1);
    gui.addGlobals('circle4Size');
    //GUI controls for rotating squares
    sliderRange(1,5,0.1);
    gui.addGlobals('squareSize');
    sliderRange(0.001,1,0.001);
    gui.addGlobals('noiseStep');
    sliderRange(0,255,1);
    gui.addGlobals('rotateThresh');
    gui.addGlobals('progThresh');
    gui.addGlobals('seedThresh');
    //GUI controls for bar wave
    sliderRange(10,60,1);
    gui.addGlobals('wavelength');
    sliderRange(50,350,1);
    gui.addGlobals('amplitude');
    sliderRange(5,50,1);
    gui.addGlobals('waveSpeed');
    sliderRange(50,200,1);
    gui.addGlobals('bar_p1');
    sliderRange(10,60,1);
    gui.addGlobals('bar_p3');
    //GUI controls for Drum Pad
    sliderRange(1,10,1);
    gui.addGlobals('fireCrackSpeed');

    
}


function draw(){
	background(0);
    
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
    
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
        
   console.log("show:" + keyCode);
	controls.keyPressed(keyCode);
    
    if(keyCode == 81){
        
        //Playing the sliced audio file when Q is pressed on the keyboard
        chopOne.play(); 
        //Pushing out new fire crackers everytime Q is pressed
        crackers_array.push(new fireCracks());
        padColor[0] = 100;
     }
    else if(keyCode == 87) {
          
        chopTwo.play(); 
        crackers_array.push(new fireCracks());
        padColor[1] = 100;
     }
    else if(keyCode == 69) {
          
        chopThree.play(); 
        crackers_array.push(new fireCracks());
        padColor[2] = 100;
     }
    else if(keyCode == 82) {

        chopFour.play(); 
        crackers_array.push(new fireCracks());
        padColor[3] = 100;
     }
    else if(keyCode == 84){
        
        chopFive.play(); 
        crackers_array.push(new fireCracks());
        padColor[4] = 100;
     }
    else if(keyCode == 89) {
          
        chopSix.play(); 
        crackers_array.push(new fireCracks());
        padColor[5] = 100;
     }
    else if(keyCode == 65) {
          
        chopSeven.play(); 
        crackers_array.push(new fireCracks());
        padColor[6] = 100;
     }
    else if(keyCode == 83) {

          chopEight.play(); 
          crackers_array.push(new fireCracks());
        padColor[7] = 100;
     }
    else if(keyCode == 68){
        
        chopNine.play(); 
        crackers_array.push(new fireCracks());
         padColor[8] = 100;
     }
    else if(keyCode == 70) {
          
          chopTen.play(); 
          crackers_array.push(new fireCracks());
        padColor[9] = 100;
     }
    else if(keyCode == 71) {
          
          chopEleven.play(); 
          crackers_array.push(new fireCracks());
        padColor[10] = 100;
     }
    else if(keyCode == 90) {

          chopTwelve.play(); 
          crackers_array.push(new fireCracks());
        padColor[11] = 100;
     }
    else if(keyCode == 88){
        
        chopThirteen.play(); 
        crackers_array.push(new fireCracks());
         padColor[12] = 100;
     }
    else if(keyCode == 67) {
          
          chopFourteen.play(); 
          crackers_array.push(new fireCracks());
        padColor[13] = 100;
     }
    else if(keyCode == 86) {
          
          chopFifteen.play(); 
          crackers_array.push(new fireCracks());
        padColor[14] = 100;
     }
    else if(keyCode == 66) {

          chopSixteen.play(); 
          crackers_array.push(new fireCracks());
        padColor[15] = 100;
     }
}

function keyReleased() {
    
    for(var i=0;i<16;i++)
    {
        padColor[i]=255;
    }
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
