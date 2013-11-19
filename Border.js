var Wall = function(x,y,width,height){
	this.type = 'wall';
    this.x = x;
	this.y = y;
    this.width = width;
    this.height = height;
    
    this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
}
Wall.prototype = new Sprite();
Wall.prototype.checkBoundingBox = function(mover){
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
    
    if (intersect.detected){
        this.collide(mover);
    }
}

Wall.prototype.collide = function(mover){
    switch(mover.type){
        case "ball":
            mover.changeSpeed(-1,1);
            lightning.gainCharge(-30); //lightning
        default:
    }
}

Wall.prototype.makeBoundingBox = function(){
    return this.boundingBox;
}

function Ceiling(x,y,width,height){
    this.type = 'floor';
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
        
    this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
}

Ceiling.prototype = new Wall();

Ceiling.prototype.collide = function(mover){
    switch(mover.type){
        case "ball":
            mover.changeSpeed(1,-1);
        default:
   }
}


function Floor(x,y,width,height){
    this.type = 'floor';
    this.x = x;
	this.y = y;
    this.width = width;
    this.height = height;
    
    this.boundingBox = new BoundingBox(this.x,this.y,this.width,this.height);
}

Floor.prototype = new Wall();

Floor.prototype.collide = function(mover){
    switch(mover.type){
        case "ball":
            game.level.floorBall(mover);
        default:
    }
}