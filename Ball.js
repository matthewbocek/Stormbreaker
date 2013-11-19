var Ball = function(x,y,dx,dy){
	this.type = 'ball';
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
    this.maxSpeed = 6;
    this.minSpeed = 0.9;
    
    this.size = 10;
    
    this.id = game.newBallId();
    this.aura = new Sprite();
}

Ball.prototype = new Sprite();

Ball.prototype.draw = function(context){
	this.aura.draw();
    
    context.beginPath();
	context.fillStyle="orange";
	context.arc(this.x,this.y,this.size,0,2*Math.PI);
	context.fill();
}

Ball.prototype.checkWalls = function(){
    if (this.x >= canvas.width-10 || this.x <= 10)
		this.dx *= -1;
	if (this.y >= canvas.height-10 || this.y <= 10)
		this.dy *= -1;
}

Ball.prototype.collide = function(moverType,pointsUsed){
    switch(moverType){
        case "ball":
            var randomPoint = Math.floor( Math.random() * pointsUsed.length );
            var acceleration = pointsUsed[randomPoint].collisionLookup(this);
            //TODO handle acceleration changes in the ball object, not the point object
            //like this:
            /*
            this.changeSpeed(ddx,ddy);
            */
            break;
            //todo where is collision case "wall"? shoudl be handled here.
        case "bolt":
            this.makeAura();
            break;
        default:
    }
}

Ball.prototype.changeSpeed = function(ddx,ddy){
    this.dx *= ddx;
    this.dy *= ddy;
}

Ball.prototype.setTrajectory = function(angle,dSpeed) {
    //TODO allow quadrants 3 & 4
    
    var totalSpeed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    
    var sign = 1;
    var xTrajectory,yTrajectory;
    
    if (angle < 0) {
        sign = -1
    }
    
    angle = Math.abs(angle);
    
    xTrajectory = Math.cos(angle) * totalSpeed * dSpeed;
    yTrajectory = Math.sin(angle) * totalSpeed * dSpeed;  

    //console.log('dSpeed = ' + dSpeed);
    //console.log('total speed = '+totalSpeed);
    
    this.dx = Math.abs( xTrajectory ) * sign;
    this.dy = Math.abs( yTrajectory ) * -1;
    
    //debugger;
}

Ball.prototype.defineCollisionPoints = function(){
    var hyp = Math.floor((this.size / Math.sqrt(2)));
    var sin = Math.floor(Math.sin(22.5) * this.size);
    var cos = Math.floor(Math.cos(22.5) * this.size);
    
    var collisionPoints = [];
    collisionPoints.push(new Point(this.x+this.size,this.y,1)); //3
    collisionPoints.push(new Point(this.x-this.size,this.y,1)); //9
    collisionPoints.push(new Point(this.x,this.y+this.size,2)); //6
    collisionPoints.push(new Point(this.x,this.y-this.size,2)); //12
    
    collisionPoints.push(new Point(this.x+hyp,this.y+hyp,3));
    collisionPoints.push(new Point(this.x-hyp,this.y+hyp,3));
    collisionPoints.push(new Point(this.x+hyp,this.y-hyp,3));
    collisionPoints.push(new Point(this.x-hyp,this.y-hyp,3));
    
    collisionPoints.push(new Point(this.x+sin,this.y+cos,4)); //going out
    collisionPoints.push(new Point(this.x-sin,this.y+cos,4)); //ball goes vertical
    collisionPoints.push(new Point(this.x+sin,this.y-cos,4));
    collisionPoints.push(new Point(this.x-sin,this.y-cos,4));
    
    collisionPoints.push(new Point(this.x+cos,this.y+sin,5)); //going up
    collisionPoints.push(new Point(this.x-cos,this.y+sin,5)); //ball horiz
    collisionPoints.push(new Point(this.x+cos,this.y-sin,5));
    collisionPoints.push(new Point(this.x-cos,this.y-sin,5));
    
    this.collisionPoints = collisionPoints;
}

Ball.prototype.speedCheck = function(speed){
    if (speed > this.maxSpeed) {
        speed = this.maxSpeed;
    }
    else if (speed < this.maxSpeed * -1) {
        speed = this.maxSpeed * -1;
    }
    else if (speed >= 0 && speed < this.minSpeed) {
        speed = this.minSpeed;
    }
    else if (speed < 0 && speed > this.minSpeed) {
        speed = this.minSpeed * -1;
    }
    return speed;
}

Ball.prototype.destroy = function(){
    this.x =-30;
    this.y =-30;
    this.dx =0;
    this.dy =0;
}

Ball.prototype.makeBoundingBox = function(){
    this.boundingBox = new BoundingBox(this.x-this.size,this.y-this.size,2*this.size,2*this.size);
}

Ball.prototype.activeAura = function(brick){
    if(this.aura.type === 'aura') {// if it has an aura
        this.aura.update();
        this.aura.defineCollisionPoints();
        brick.checkBoundingBox(this.aura);
        this.aura.draw(context);
    }
}

Ball.prototype.makeAura = function(time){
    this.aura = new Aura(this,time);
}

var Aura = function(ball,time){
    this.target = ball;
    this.x = target.x;
    this.y = target.y;
    this.size = target.size*2;
    this.type = "aura";
    this.collisionPoints = [];
    
    this.time = time;
} //todo consider alternative: the aura doesn't need x, y, etc. It stores the ball and passes the ball's location as parameters to ball.defineCollisionPoints.

Aura.prototype = new Ball(0,0,0,0);

Aura.prototype.update = function(){
    this.x = target.x;
    this.y = target.y;
}

Aura.prototype.draw = function(context){
    context.beginPath();
    context.arc(this.x,this.y,this.size,0,Math.PI * 2);
    context.fillStyle = "#add8e6";
    context.fill();
}