function Wall(coordinate,position){
	this.position = position;
	this.coordinate = coordinate;
}
Wall.prototype = {
	checkWall : function(obj) {
		if (obj[this.coordinate] = this.position){
			obj.bounce(this.coordinate);
		}	
	}
}