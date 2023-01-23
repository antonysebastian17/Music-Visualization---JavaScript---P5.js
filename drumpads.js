function drumpads(){
	this.name = "drumpads";
   
	this.draw = function(){
        
        for(var i=0;i<crackers_array.length;i++)
        {
            crackers_array[i].draw();
            crackers_array[i].speed+=fireCrackSpeed;
            if(crackers_array[i].speed>windowWidth)
            {
                
                crackers_array.splice(crackers_array.indexOf(crackers_array[i]), 1);
            }
        }
        
		push();
        
		//Making the 16pad drumset
        //writtentext
        stroke(0);
        textSize(20);
        //Initilizing variable count=1. This is being incremented inside the for loop.
        var count=1;
        for(i=0; i<4; i++){
            
            for(j=0;j<4;j++){
                fill(255, padColor[count-1], 200-((count-1)*10));
                rect(((j+1)*100)+width/3, 100*(1+i), 100, 100);
                fill("black");
                text(writtenText.charAt(count-1), (((j+1)*100)+20+width/3), (i+1.5)*100);
                count++;
            }
    }

		pop(); 
       
	};
}

function fireCracks(){
    this.speed = 0;
    this.x_position = random(0,width);
    this.y_position = random(0,height);
    var green = random(0,255); 
    var blue = random(0,255);
    var red = random(0,255);
    
    var randomSize = random(10,40);
    
    function draw_crackers(x,y,c_color)
    {
        push();
        fill(c_color);
        translate(x,y);
        ellipse(0,0,randomSize,randomSize);
        pop();
    }
    
    this.draw = function()
    {
        push();
        translate(this.x_position,this.y_position);
        for(var i=0;i<8;i++){
            rotate((2*PI)/8);
            draw_crackers(0,this.speed,[red,green,blue]);
        }
        pop();
    }
}
