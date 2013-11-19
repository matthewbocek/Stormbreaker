var Sprite = function(){}
Sprite.prototype = {
	x:0,
	y:0,
	dx:0,
	dy:0,
	type:"sprite",
    draw: function(context){ },
	checkWalls : function(){ },
	update : function(){      
        this.x = this.x + this.dx;
		this.y = this.y + this.dy;
	},
    
    collisionPoints: [], //todo this is another example of a value that could be stored in a function via closure (since it is only ever accessed by one function) and not clutter up the object's namespace, where it has no context or meaning.
    collide : function(target,point){ },
    defineCollisionPoints: function(){ },
    makeBoundingBox: function(){ return new BoundingBox(0,0,0,0)},
    checkBoundingBox: function(mover){
        var intersect = {detected:false,type:''};
        
        var boundingbox = this.makeBoundingBox();

        var listOfIntersectingPoints = [];
        
        $.each(mover.collisionPoints,function(){//TODO functionalize the mover providing points??
            if (boundingbox.contains(this)){
                listOfIntersectingPoints.push(this);
                intersect.detected = true;
                intersect.type = mover.type;
            }
        });
        
        if (intersect.detected){ //TODO change this section similar to Wall class to allow more control over the mover's behavior
            mover.collide(intersect.type,listOfIntersectingPoints);
            this.collide(intersect.type);
        }
    }
}