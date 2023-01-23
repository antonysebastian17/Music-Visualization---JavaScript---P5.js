// I took inspiration from: 
// 1. I extensively used desmos to understand the properties of sine and cosine functions to manipulate the waveform correctly through the GUI. 
// 2. 

function barwave(){
	this.name = "barwave";
    //random colours array
    var change_color = [random(0,255),random(0,255),random(0,255)];
   
    // main draw function
	this.draw = function(){
		push();
        
        //Getting frequencies and storing in musicList
        var musicList=fourier.analyze();
        noStroke();
        
        //Changing colour of rectangular barwave every 50 frames
        if(frameCount%50==0){
            change_color = [random(0,255),random(0,255),random(0,255)];
        }
        fill(change_color);
        
        //Iterating through the arrray musicList for the length of the array
		for(var i = 0; i<musicList.length; i++){

            //Initialising the variable sinWave to give the otherwise straightline rectangular bar visualizer a waveform. Since, sine of any value always gives an output between -1 and 1 we can get a waveform by adding it to height/2 as shown in rectY.
            
            //The wavelength variable(initialised in sketch.js) in sinWave is a GUI functionality that can be used to manipulate the length of the wave. 
            
            //frameCount is being used inside the sineWave variable to make the move wave in the desired direction. If it is added as shown below the wave moves to the left side, whereas when it is subtracted the wave moves to the right. The waveSpeed variable(initialised in sketch.js)  that is a GUI functionality that is being used to control the speed at which the wave moves in the desired direction. The higher the value of waveSpeed the slower it moves and vice-versa.
            
            //the amplitude variable(initialised in sketch.js) is a GUI functionality that is being used to increase or decrease the height or amplitude of the wave.
            var sinWave    = (sin((i/wavelength)+(frameCount/waveSpeed))*amplitude);
            
            
            var cosWave     = (cos(frameCount/bar_p3)*bar_p1);
            
            //y-position of the rectangles in the rectangular barwave
			var rectY       = ((height/2) + sinWave + cosWave);
            
            //intialising variables upwardRect and downwardRect to be equal to a frequency in the musicList array. So, the length of the rectangle is constantly changing with respect to the frequencies inside the musicList array. Width/300(negligable value) is used so that we can see a line when no music is playing.  
            var upwardRect    = width/300-musicList[i];
            var downwardRect  = width/300+musicList[i];
            
            //The rectX variable is calculated by dividing the width of the screen with the length of the array musicList and multiplying by 'i', giving a new rectX value with each iteration of the for loop.
            var rectX       = (i*(width/musicList.length));
            
            //rectX is multiplied by 1.4 to get rectXFitToScreen so that the rectangular barwave fits the screen.
            var rectXFitToScreen = rectX*1.4;
            
            //rectWidth variable is the width of the rectangle in the rectangular barwave.
            var rectWidth     = (width/musicList.length);
            
            //drawing the upward rectangle in the rectangular barwave
            rect(rectXFitToScreen ,rectY ,rectWidth ,upwardRect);
            
            //drawing the downward rectangle in the rectangular barwave
            rect(rectXFitToScreen ,rectY ,rectWidth ,downwardRect);
		}
        
		pop();
	};
}