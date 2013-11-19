var Layout = function(levelNumber,bricks,param){
    if (typeof(param) === 'undefined'){
        param = {};
    }   
    this.number = levelNumber;    
    this.balls = this.makeBalls(param.balls);
    this.bricks = this.makeBricks(bricks);
    this.paddle = this.makePaddle(param.paddle);
    this.walls = this.makeWalls(param.walls);
    
    this.bolt = new Sprite(); // todo allow for the unlikely case of more than 1 bolt
    this.explosions = [];
}

Layout.prototype.makeBalls = function(balls){
    if (typeof(balls) === 'undefined'){
        balls = 1;
    }
    var list = [];
    for(var i=0;i<balls;i++){
        list.push( new Ball( (canvas.width/2)+Math.random()*10,canvas.height/2+Math.random()*10,-0.9,0.9) );
    }
    return list;
}

Layout.prototype.makeBricks = function(bricks){
    var list = [];
    $.each(bricks,function(){
        list.push( new Brick(this.x,this.y,this.param) );
    });
    return list;
}

Layout.prototype.makePaddle = function(param){
    return new Paddle(param);
}

Layout.prototype.makeWalls = function(param){
    var list = [];
    list.push( new Wall(-10,0,10,canvas.height) );
    list.push( new Wall(canvas.width,0,10,canvas.height) );
    list.push( new Ceiling(0,-10,canvas.width,10) );
    list.push( new Floor(0,canvas.height,canvas.width,10) );
    return list;
}

Layout.prototype.update = function(){   
    this.bricks = $.grep(this.bricks,function(brick){
        if (brick.isDestroyed){
            return false
        }
        else{
            return true;
        }
    });
    
    this.explosions = $.grep(this.explosions,function(explosion){
        if (explosion.size<explosion.maxSize)
            return true;
        else
            return false;
    });
    
    this.checkWin();
}

Layout.prototype.draw = function(context){
    $.each(bricks,function(context){
        this.draw(context);
    });
}

Layout.prototype.floorBall = function(floorBall){
    floorBall.destroy();
    this.balls = $.grep(this.balls,function(testBall,i){
        if(testBall.id === floorBall.id){
            return false;
        }
        else {
            return true;
        }
    });
    if (this.balls.length < 1){
        game.death();
    }
}

Layout.prototype.checkWin = function(){
    //TODO handle indestructible bricks so that the player can progress
    if(this.bricks.length < 1){
        game.nextLevel();
    }
}

Layout.prototype.vulnerablilityTimer = function(){
    console.log("bricks recovered");
    $.each(this.bricks,function(){ this.isVulnerable = false; });
}

Layout.prototype.animate = function(context){
    var stationarySprites = [this.paddle].concat(this.bricks,this.walls);
    context.clearRect(0,0,canvas.width,canvas.height);
    
    //todo layout.animate() now has separate loops for bolt,ball, & paddle, with lightningmeter thrown in & aura in another place. Let's find a reasonable way to consolidate so that each member of Stationary sprites only has to get touched once, and only by the movers that it should interact with. It would be cool if the interacting movers were stored in the stationarySprite objects  rather than being hard-coded in this function.
    this.paddle.update();
    this.paddle.draw(context);
    //debugger;
    $.each(this.balls,function(){
        var ball = this;
        ball.update();
        ball.defineCollisionPoints();
        
        $.each(stationarySprites,function(){
            this.checkBoundingBox(ball);
            this.draw(context);
            ball.activeAura();
        });
        
        ball.draw(context);
        
        lightning.update(ball); //LIGHTNING
        lightning.draw( document.getElementById('lightningMeter') ); //LIGHTNING
        
        updateInfo(this.paddle,ball); //test
    });
    
    var bolt = this.bolt;
    bolt.defineCollisionPoints();
    $.each([this.paddle].concat(this.bricks),function(){ // TODO add balls
        this.checkBoundingBox(bolt);
    });
    this.bolt.draw(); //Lightning
    
    $.each(this.explosions,function(){
        var explosion = this;
        explosion.update();
        explosion.defineCollisionPoints();
        
        $.each(stationarySprites,function(){
            this.checkBoundingBox(explosion);
        });
        explosion.draw(context);
    });
       
    
    
    this.update();
    
    setTimeout( function(){ game.level.animate(context) }, game.gameSpeed );
}