function rotatingsquare(){
	this.name = "rotatingsquare";
    var rot=0;
    function rotatingBlocks(energy)
    {

        if(energy < rotateThresh)
        {
            rot += 0.01;
        }

        var r = map(energy, 0, 255, 20, 100)*squareSize;

        push();
        rectMode(CENTER);
        translate(width/2, height/2);
        rotate(rot);
        fill(100,20,energy);


        var incr = width/8;

        for(var i = 0; i < 10; i++)
        {
            rect(i * incr - width/2,0,r,r);
            
        //Code adapted from https://p5js.org/examples/hello-p5-simple-shapes.html
            for (var j = 0; j < 10; j ++) {
            ellipse(i*incr, 30, 20, 80);
            rotate(PI/5);
            }
        }
        pop();
    }
    function noiseLine(energy, energy2)
    {
        push(); 
        translate(width/2, height/2);
        beginShape();
        noFill();
        stroke(0,200,0);
        strokeWeight(3);

        for(var i = 0; i < 100; i++)
        {

            var x = map(noise(i* noiseStep + prog),0,1,-250,250);
            var y = map(noise(i* noiseStep + prog + 1000),0,1,-250,250);


            vertex(x,y);
        }
        endShape();


        if(energy > progThresh)
        {
            prog += 0.05;
        }

        if(energy2 > seedThresh)
        {
            noiseSeed();
        }

        pop();
    }
	this.draw = function(){
		push();
		var spectrum = fourier.analyze();
        var b = fourier.getEnergy("bass");
		var t = fourier.getEnergy("treble");
		noStroke();
        rotatingBlocks(t);
        noiseLine(b,t);
		pop();
	};
}
