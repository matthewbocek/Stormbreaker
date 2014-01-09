var Timer = function(callback,delay){//taken from Tim Down @ http://stackoverflow.com/questions/3969475/javascript-pause-settimeout
    this.timeRemaining = delay;
    this.totalTime = delay;
    this.callback = callback;
    this.startTime;
    this.id;
    this.isPaused;
    
    this.pause = function(){
        this.isPaused = true;
        
        window.clearTimeout(this.id);
        this.timeRemaining = this.timeRemaining - (new Date() - this.startTime);
    }
    
    this.resume = function(){
        this.isPaused = false;
        
        window.clearTimeout(this.id);
        this.startTime = new Date();
        this.id = window.setTimeout(callback,this.timeRemaining);
    }
    
    this.resume();
}