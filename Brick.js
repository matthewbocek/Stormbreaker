var Brick = function(x,y,param){
	if(typeof(param) === 'undefined'){
        param = {};
    }
    this.x = x;
    this.y = y;
	this.dx = param.dx || 0;
	this.dy = param.dy || 0;
	this.width = param.width || 50;
	this.height = param.height || 30;
	this.hits = param.hits || 1;
    this.pointValue = param.pointValue || this.hits*10;
    this.color = param.color || 'black';
    this.type = 'brick';
    this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
    this.isDestroyed = false;
    this.isVulnerable = false;
}

Brick.prototype = new Sprite();

Brick.prototype.draw = function(context) {
	context.beginPath();
    if(this.isVulnerable)
        context.fillStyle = "red"
    else
        context.fillStyle = this.color;
    context.fillRect(this.x,this.y,this.width,this.height);
}

Brick.prototype.makeBoundingBox = function(){
    return this.boundingBox;
}

Brick.prototype.defineCollisionSpace = function(){
    var collisionSpace = [];
    
    for(var i=0;i<this.width;i++){
        for(var j=0;j<this.height;j++){
            collisionSpace.push(new Point(x+i,y-j));
        }
    }

    return collisionSpace;
}

Brick.prototype.collide = function(collisionType){
    switch(collisionType){
        case 'ball':
        case 'aura':
            if(this.isVulnerable){
                game.level.explosions.push(new Explosion(this.x+this.width/2,this.y+this.height/2,50))
            }
            
            this.hits -= 1;
            if (this.hits < 1){
                this.isDestroyed = true;
                lightning.gainCharge(100); //lightning
            }
            break;
        case 'bolt':
            if(!this.isVunerable){
                this.isVulnerable = true;
                //setTimeout(function(){game.level.vulnerablilityTimer},3000);//
                //this.vulnerabilityTimer(3000);
                //test ^
            }
            break;
        case 'explosion':
            if(this.isVulnerable){
                this.isDestroyed = true;
                if(this.isVulnerable){
                    game.level.explosions.push(new Explosion(this.x+this.width/2,this.y+this.height/2,50))
                }
            }
        
        default:
    }
}

Brick.prototype.vulnerabilityTimer = function(time){
    var self = this;
    setTimeout(function(){
        self.isVulnerable = false;
    },time);
}