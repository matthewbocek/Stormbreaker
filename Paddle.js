var Paddle = function(param){
	if (typeof(param) === 'undefined'){
        param = {};
    }
    
    this.type = 'paddle';
    this.x = param.x || canvas.width/2;
	this.y = param.y || canvas.height-25;
	this.size = param.size || 90;
    this.height = param.height || 10;
    
    this.topSpeed = 1;
    this.isFrozen = false;
    this.canCollide = true; //todo this is not used for anything
}

Paddle.prototype = new Sprite();
Paddle.prototype.draw = function(context){
	context.beginPath();
	context.fillStyle = "blue";
    if(this.isFrozen)
        context.fillStyle = "#add8e6";
	context.fillRect(this.x,this.y,this.size,this.height);
}

Paddle.prototype.update = function() {
	if(!this.isFrozen){
        var target;
        if (mousePos.x < 1) {
            target = 1;
        }
        else if (mousePos.x>849-this.size) {
            this.x = 849 - this.size;
        }
        else {
            this.x = mousePos.x;
        }
    }
}

/*
Paddle.prototype.move = function(target){
//has max movespeed. Does not function correctly
    var center = this.x+0.5*this.size;
    if (target < center){
        if (center-target < this.topSpeed) {
            this.x = this.target=0.5*this.size;
        }
        else{
            this.x -= this.topSpeed;
        }
    }
    else if (target > center){
        if (target-center < this.topSpeed) {
            this.x = this.target+0.5*this.size;
        }
        else{
            this.x += this.topSpeed;
        }
        
    }
}
*/

Paddle.prototype.collide = function(collisionType){
    switch(collisionType){
        case 'bolt':
            this.isFrozen = true;
            this.frozenTimer(2000);
        break;
        default:
    }
}

Paddle.prototype.makeBoundingBox = function(){
    var bb = new BoundingBox(this.x,this.y,this.size,this.height);
    return bb;
}

Paddle.prototype.checkBoundingBox = function(mover){
    var intersect = {detected:false,type:''};

    var boundingbox = this.makeBoundingBox();
    //console.log(boundingbox);

    var listOfIntersectingPoints = [];
    
    $.each(mover.collisionPoints,function(){
        if (boundingbox.contains(this)){
            listOfIntersectingPoints.push(this);
            intersect.detected = true;
            intersect.type = mover.type;
        }
    });
    if (intersect.detected && this.canCollide) {
        
        //this.collisionTimer();
        
        switch(intersect.type) {
            case 'ball':
                var randomPoint = listOfIntersectingPoints[ Math.floor( Math.random() * listOfIntersectingPoints.length ) ];
                
                var midpoint = this.x+(0.5)*this.size;
                var range = this.size/2;
                
                var distanceFromMidpoint = midpoint-randomPoint.x;
                var sign = -1;
                
                //console.log(midpoint);
                //console.log(randomPoint.x);
                //console.log(distanceFromMidpoint);
                
                if (distanceFromMidpoint < 0) {
                    sign = 1;
                }
                
                var percent = Math.abs( distanceFromMidpoint / range );
                
                //console.log(percent);
                
                var angle = percent * 79;
                angle += 1;
                angle *= sign;
                
                var speed = percent * 45;
                speed += 85;
                speed /= 100;
                
                $('#bounceSpeed').text(speed);
                $('#bounceAngle').text(angle);
                
                mover.setTrajectory(angle,speed);            
                break;
            case 'bolt':
                this.isFrozen = true;
                this.frozenTimer(2000);
                break;
            default:
            //do nothing
        }
    }
}

Paddle.prototype.frozenTimer = function(time){
//TODO unifying different status timers functions is probably a good candidate for a closure.
    var self = this;
    timers.push( new Timer( function(){
        self.isFrozen = false;
    },time) );
}

Paddle.prototype.collisionTimer = function(){
    this.canCollide = false;
    timers.push( new Timer( function(){ this.canCollide = true; },1000) );
}