var Explosion = function(x,y,maxSize){
    this.x = x;
    this.y = y;
    this.size = 0;
    this.maxSize = maxSize;
    this.speed = 5;
    this.type = "explosion";
    this.collisionPoints = [];
}

Explosion.prototype = new Sprite();

Explosion.prototype.update = function(){
    if(this.size<this.maxSize){
        this.size += this.speed;
    }
}

Explosion.prototype.draw = function(context){
    context.fillStyle="yellow";
    context.beginPath();
    context.arc(this.x,this.y,this.size,0,2*Math.PI);
    if(this.size>10){
        context.arc(this.x,this.y,this.size-10,2*Math.PI,0);
    }
    context.closePath();
    context.fill();
}

Explosion.prototype.defineCollisionPoints = function(){
    var hyp = Math.floor((this.size / Math.sqrt(2)));
    var sin = Math.floor(Math.sin(22.5) * this.size);
    var cos = Math.floor(Math.cos(22.5) * this.size);
    
    var collisionPoints = [];
    collisionPoints.push(new Point(this.x+this.size,this.y)); //3
    collisionPoints.push(new Point(this.x-this.size,this.y)); //9
    collisionPoints.push(new Point(this.x,this.y+this.size)); //6
    collisionPoints.push(new Point(this.x,this.y-this.size)); //12
    
    collisionPoints.push(new Point(this.x+hyp,this.y+hyp));
    collisionPoints.push(new Point(this.x-hyp,this.y+hyp));
    collisionPoints.push(new Point(this.x+hyp,this.y-hyp));
    collisionPoints.push(new Point(this.x-hyp,this.y-hyp));
    
    collisionPoints.push(new Point(this.x+sin,this.y+cos)); //going out
    collisionPoints.push(new Point(this.x-sin,this.y+cos)); //ball goes vertical
    collisionPoints.push(new Point(this.x+sin,this.y-cos));
    collisionPoints.push(new Point(this.x-sin,this.y-cos));
    
    collisionPoints.push(new Point(this.x+cos,this.y+sin)); //going up
    collisionPoints.push(new Point(this.x-cos,this.y+sin)); //ball horiz
    collisionPoints.push(new Point(this.x+cos,this.y-sin));
    collisionPoints.push(new Point(this.x-cos,this.y-sin));
    
    this.collisionPoints = collisionPoints;
}