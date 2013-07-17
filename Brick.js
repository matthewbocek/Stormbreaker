var Brick = function(x,y,param){
	this.x = x;
	this.y = y;
	this.dx = param.dx || 0;
	this.dy = param.dy || 0;
	this.height = param.height || 50;
	this.width = param.width || 30;
	this.hits = param.hits || 1;
}
Brick.prototype = new Sprite();
Brick.prototype.draw = function(context) {
	context.beginPath
}