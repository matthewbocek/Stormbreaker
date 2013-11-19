var Timer = function(callback,delay){//taken from Tim Down @ http://stackoverflow.com/questions/3969475/javascript-pause-settimeout
    this.timeRemaining = delay;
    this.totalTime = delay;
    this.callback = callback;
    this.startTime;
    this.id;
    
    this.pause = function(){
        window.clearTimeout(timerId);
        this.timeRemaining = this.timeRemaining - (new Date() - this.startTime)
    }
    
    this.resume = function(){
        window.clearTimeout(timerId);
        this.startTime = new Date();
        this.id = window.setTimeout(callback,timeRemaining);
    }
    
    this.resume();
}