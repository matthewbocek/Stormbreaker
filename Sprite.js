var Sprite = function(){}
Sprite.prototype = {
	x:0,
	y:0,
	dx:0,
	dy:0,
	draw: function(context){ },
	checkWalls : function(){ },
	update : function(){
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
	}
}

var Ball = function(x,y,dx,dy){
	this.name = 'myBall';
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
}
Ball.prototype = new Sprite();
Ball.prototype.draw = function(context){
	context.beginPath();
	context.fillStyle="orange";
	context.arc(this.x,this.y,10,0,2*Math.PI);
	context.fill();
}
Ball.prototype.checkWalls = function(){
	if (this.x >= canvas.width-10 || this.x <= 10)
		this.dx *= -1;
	if (this.y >= canvas.height-10 || this.y <= 10)
		this.dy *= -1;
	if (this.x > paddle.x && this.x < paddle.x + paddle.size) {
		if (this.y > paddle.y-5 && this.y < paddle.y) {
			this.dy *= -1;
		}	
	}
}

var Paddle = function(x,size){
	this.x=x || canvas.width/2;
	this.y = canvas.height-25;
	this.size = size || 90;
}
Paddle.prototype = new Sprite();
Paddle.prototype.draw = function(context){
	context.beginPath();
	context.fillStyle = "blue";
	context.fillRect(this.x,this.y,this.size,10)
}
Paddle.prototype.update = function() {
	this.x = mousePos.x;
}
Paddle.prototype.checkWalls = function(){
	if(this.x < 0)
		this.x = 0;
	if(this.x > context.width-this.size)
		this.x = context.width-this.size;
}