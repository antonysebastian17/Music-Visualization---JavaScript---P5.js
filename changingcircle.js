// I took inspiration from: 
// 1.https://www.advanced-ict.info/mathematics/circles.html
// 2. https://p5js.org/reference/#/p5/curveVertex
// for drawing circle using vertex function 
function changingcircle(){
	this.name = "changingcircle";
    var color1=[random(0,255),random(0,255),random(0,255)];
    var color2=[random(0,255),random(0,255),random(0,255)];
    var color3=[random(0,255),random(0,255),random(0,255)];
    var color4=[random(0,255),random(0,255),random(0,255)];
    // main draw function
	this.draw = function(){
		push();
        var frequencyArray=fourier.analyze();
        translate(width/2,height/2);
        if(frameCount%50==0)
        {
            color1=[random(0,255),random(0,255),random(0,255)];
            color2=[random(0,255),random(0,255),random(0,255)];
            color3=[random(0,255),random(0,255),random(0,255)];
            color4=[random(0,255),random(0,255),random(0,255)];
        }
        fill(color1);
        noStroke();
        
        beginShape();
        //loop drawing  circle1
        for(var i=0;i<=199;i++)
        {
            var eachFrequencySize = map(frequencyArray[i], 0, 255, height, 0)-height;
            var x = cos(i) * (3.0+(eachFrequencySize*circle1Size));
            var y = sin(i) * (3.0+(eachFrequencySize*circle1Size));
            curveVertex(x, y);
        }     
        endShape();
        fill(color2);
        beginShape();
        //loop drawing circle2
        for(var i=200;i<=399;i++)
        {
            var eachFrequencySize = map(frequencyArray[i], 0, 255, height, 0)-height;
            var x = cos(i) * (3.0+(eachFrequencySize*circle2Size));
            var y = sin(i) * (3.0+(eachFrequencySize*circle2Size));
            curveVertex(x, y);
        }     
        endShape();
        fill(color3);
        beginShape();
        //loop drawing circle3 
        for(var i=400;i<=599;i++)
        {
            var eachFrequencySize = map(frequencyArray[i], 0, 255, height, 0)-height;
            var x = cos(i) * (3.0+(eachFrequencySize*circle3Size));
            var y = sin(i) * (3.0+(eachFrequencySize*circle3Size));
            curveVertex(x, y);
        }     
        endShape();
        fill(color4);
        beginShape();
        //loop drawing circle4
        for(var i=600;i<=799;i++)
        {
            var eachFrequencySize = map(frequencyArray[i], 0, 255, height, 0)-height;
            var x = cos(i) * (3.0+(eachFrequencySize*circle4Size));
            var y = sin(i) * (3.0+(eachFrequencySize*circle4Size));
            curveVertex(x, y);
        }     
        endShape();
		pop();
	};
}
