var BoundingBox = function(x,y,length,height){
    this.x1 = x;
    this.x2 = x+length;
    this.y1 = y;
    this.y2 = y+height;
}

BoundingBox.prototype.contains = function(point){
    if (point.x > this.x1) {
        if (point.x < this.x2) {
            if (point.y > this.y1) {
                if (point.y < this.y2) {
                    return true;
                }
            }
        }
    }
    return false;
}

