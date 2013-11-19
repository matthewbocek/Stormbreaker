var Lightning = function(){
    this.charge = 999;
    console.log("Lightning created");

}

Lightning.prototype.draw = function(canvas){
    var chargePercent = this.charge / 1000;
    var chargeHeight = chargePercent * canvas.height;
    var c = canvas.getContext('2d');
    c.clearRect(0,0,canvas.width,canvas.height);
    c.beginPath();
    c.fillStyle = "aqua";
    c.fillRect(0,canvas.height,canvas.width,-1*chargeHeight);
    
    this.isActive = false;
}

Lightning.prototype.update = function(ball){
    var totalSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
    //this.gainCharge(totalSpeed-1);
    
    if(this.charge>1000){
        this.bolt(); //TODO wtf
        //this.charge = 0; 
        this.charge = 999 ;//test
    }
    if(this.charge<0){
        this.charge = 0;
    }
}

Lightning.prototype.bounce = function(){
    
}

Lightning.prototype.gainCharge = function(amount){
    this.charge += amount;
}

Lightning.prototype.bolt = function(){ //todo useless horrible function
    do{
        var top = Math.random()*canvas.width/2+canvas.width/4;
        var bottom = (Math.random()*canvas.width/4 - canvas.width/8)+top;
    }while(top == bottom);
    
    game.level.bolt = new Bolt(top,bottom); //todo horrible reference
}

var Bolt = function(top,bottom){
    this.top = top;
    this.bottom = bottom;
    this.slope = canvas.height/(this.bottom-this.top); //Todo does anything?
    
    this.baseLength = this.bottom - this.top;
    //this.baseLength = this.top - this.bottom ; //test
    
    this.type = "bolt";
    this.collisionPoints = [];
    this.activeHeight = 0;
}

Bolt.prototype = new Sprite();

Bolt.prototype.update = function(){

}

Bolt.prototype.draw = function(){
    //console.log("bolt.draw from " + this.top + " to " + this.bottom);
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.beginPath();
    
    context.moveTo(this.top,0);
    context.lineTo(this.bottom,canvas.height);
    context.stroke();
    
    if(this.isActive && this.activeHeight>0){
        context.beginPath();
        context.strokeStyle = 'red';
        context.lineWidth = 3;    

        context.moveTo(this.top,0);
        var xCoordinate = (this.activeHeight * this.baseLength / canvas.height) + this.top;
        context.lineTo(xCoordinate,this.activeHeight);
        context.stroke();
    }
    else if(this.isActive){
        //do nothing, wait for Timeout event incrementActiveHeight
    }
    else{
        this.isActive = true;
        setTimeout(function(){ game.level.bolt.incrementActiveHeight(11); },1000);
    }
}

Bolt.prototype.incrementActiveHeight = function(heightIncrement){
    this.activeHeight += heightIncrement;
    if(this.activeHeight<canvas.height){
        setTimeout(function(){ game.level.bolt.incrementActiveHeight(20); },1);
    }
    else {
        setTimeout(function(){ game.level.bolt = new Sprite(); },250);
    }
}

Bolt.prototype.defineCollisionPoints = function(){
    this.collisionPoints = []; //todo stop re-push the same points over and over
    for(var yCoordinate=0;yCoordinate<this.activeHeight;yCoordinate+=5){
        var xCoordinate = (yCoordinate * this.baseLength / canvas.height) + this.top;
        this.collisionPoints.push( new Point(xCoordinate,yCoordinate) );
        this.collisionPoints.push( new Point(xCoordinate+3,yCoordinate) );
        this.collisionPoints.push( new Point(xCoordinate-3,yCoordinate) );
    }
    
Bolt.prototype.checkBoundingBox = function(mover){
    //do nothing
}
}