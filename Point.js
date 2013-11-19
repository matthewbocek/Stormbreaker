var Point = function(x,y,collisionIndex){
    this.x = x;
    this.y = y;
    this.collisionIndex = collisionIndex || 0;
} 

Point.prototype.compare = function(testPoint){
    if ((this.x == testPoint.x) && (this.y == testPoint.y)) {
        return true;
    }
    return false;
}

Point.prototype.collisionPattern = function(){
    //each point on the ball needs a collision pattern. Maybe subclass for ball-points.
    //TODO this crap with bounce patterns might be a good candidate for a closure?
}

Point.prototype.collisionLookup = function(ball){ //TODO move this control to the ball object
    var dx = 1;
    var dy = 1;
    
    var bouncePattern0 = function(ball){
        console.log('bouncepattern 0');
    }
    var bouncePattern1 = function(ball){
        //console.log('pattern 1');
        ball.dx *= -1;
    }
    var bouncePattern2 = function(ball){
        //console.log('pattern 2');
        ball.dy *= -1;
    }
    var bouncePattern3 = function(ball){
        //console.log('pattern 3');
        ball.dx *= -1;
        ball.dy *= -1;
    }    
    var bouncePattern4 = function(ball){
        //console.log('pattern 4');
        var totalSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
        
        ball.dx = -1 * totalSpeed/3;
        ball.dy = -1 * totalSpeed * 2/3;
    }
    
    var bouncePattern5 = function(ball){
        //console.log('pattern 5');
        var totalSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);        
        
        ball.dx = -1 * totalSpeed * 2/3;
        ball.dy = -1 * totalSpeed/3;
        
        /*
        ball.dx *= -1.5;
        ball.dy *= -.66;
        */
    }
    
    var collisionPatterns = [ bouncePattern0,bouncePattern1,bouncePattern2,bouncePattern3,bouncePattern4,bouncePattern5 ]
    
    return collisionPatterns[this.collisionIndex](ball);
}