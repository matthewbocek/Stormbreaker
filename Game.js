var Game = function(param){
    this.layoutList = param.layoutList; //required
    
    this.lives = param.lives || 3;
    this.ballCount = param.balls || 1;
    this.startingLevel = param.startingLevel || 1;
    this.score = param.score || 0;
    this.ballIdNumber = 0; //todo should be in a closure of ball class
    this.level = {};
    this.speeds = {"unpaused":1,"paused":10000000};  
    this.gameSpeed = this.speeds.unpaused;
}

Game.prototype.start = function(levelNumber,index){
    this.level = new Layout(levelNumber,this.layoutList[index]);
    this.level.animate(context);
}

Game.prototype.newBallId = function(){
    this.ballIdNumber += 1;
    return this.ballIdNumber - 1;
}

Game.prototype.changeScore = function(value){
    this.score += value;
}

Game.prototype.gameOver = function(){
    alert('game over');
    window.reload();
}

Game.prototype.death = function(){
    this.lives -= 1;
    if (this.lives < 0){
        this.gameOver();
    }
    else {
        this.level.balls = this.level.balls.concat(this.level.makeBalls()); //TODO let the level object deal with the balls more directly; we are only here to check lives.
        this.togglePause();
    }
}

Game.prototype.togglePause = function(){
    console.log('pause')
    if(this.gameSpeed == this.speeds.paused){
        this.gameSpeed = this.speeds.unpaused;
        this.level.animate(context);
    }
    else{
        this.gameSpeed = this.speeds.paused;
        this.level.animate(context);
    }
}

Game.prototype.nextLevel = function(){
    this.start(this.level.number+1,this.level.number+1);
    this.togglePause();
}