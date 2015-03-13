IW.drawBall = function(x, y, r, color){
	IW.context.fillStyle = color;
	IW.context.beginPath();
	IW.context.arc(x, y, r, 0, Math.PI*2, true);
	IW.context.closePath();
	IW.context.fill();
}

IW.drawLine = function(p1x, p1y, p2x, p2y, color){
	IW.context.strokeStyle = color;
	IW.context.moveTo(p1x,p1y);
	IW.context.lineTo(p2x,p2y);
	IW.context.stroke();
}

IW.drawEdge = function(p1,p2,color){
	IW.context.strokeStyle = color;
	IW.context.moveTo(p1.x,p1.y);
	IW.context.lineTo(p2.x,p2.y);
	IW.context.stroke();
}

IW.drawText = function(text, x, y, color, font, size){
	IW.context.fillStyle = color;
	IW.context.font = "bold " + size +" " + font;
	IW.context.fillText(text, x, y);
}

IW.drawImage = function(img, sx, sy, swidth, sheight, x, y, width, height){
	IW.context.drawImage(	img, sx, sy, swidth, sheight, x, y, width, height);	
}

IW.clear = function(){
	IW.canvas.width =  IW.canvas.width;
}

IW.Point2D = function(x, y){
	this.x = x;
	this.y = y;
}

IW.Triangle = function(v1, v2, v3){
	this.v1 = v1;
	this.v2 = v2;
	this.v3 = v3;
}

IW.Triangle.prototype.update = function(){
	IW.drawEdge(this.v1,this.v2,"#ff0000");
	IW.drawEdge(this.v2,this.v3,"#ff0000");
	IW.drawEdge(this.v3,this.v1,"#ff0000");
}

IW.Triangle.prototype.isTouched = function(p){
	//v1 v2 v3
	var or = (this.v1.x - this.v3.x) * (this.v2.y - this.v3.y) - (this.v1.y - this.v3.y) * (this.v2.x - this.v3.x);
	//v1 v2 p
	var or1 = (this.v1.x - p.x) * (this.v2.y - p.y) - (this.v1.y - p.y) * (this.v2.x - p.x);
	//v2 v3 p
	var or2 = (this.v2.x - p.x) * (this.v3.y - p.y) - (this.v2.y - p.y) * (this.v3.x - p.x);
	//v3 v1 p
	var or3 = (this.v3.x - p.x) * (this.v1.y - p.y) - (this.v3.y - p.y) * (this.v1.x - p.x);
	
	if(or >= 0){
		return (or1 >= 0 && or2 >= 0 && or3 >= 0);
	}else{
		return (or1 < 0 && or2 < 0 && or3 < 0);
	}
}

//////////////////////////14-07-2013//////////////////////

IW.D_TOUCH_DETECTION = 0;
IW.D_COLLISION_DETECTION = 1;
IW.D_NO_ALIGN = 0;
IW.D_CENTER = 1;
IW.D_TOP = 2;
IW.D_BOTTOM = 3;
IW.D_LEFT = 4;
IW.D_RIGHT = 5;
IW.D_SHOW_TOP_TO_BOTTOM = 0;
IW.D_SHOW_LEFT_TO_RIGHT = 1;
IW.D_SHOW_CENTER = 2;

IW.Drawable = function(x, y, width, height){
	this.width = width;
	this.height = height;
	this.halfWidth = width/2;
	this.halfHeight = height/2;
	//Base points
	this.p1 = new IW.Point2D(-this.halfWidth,this.halfHeight);
	this.p2 = new IW.Point2D(this.halfWidth,this.halfHeight);
	this.p3 = new IW.Point2D(this.halfWidth,-this.halfHeight);
	this.p4 = new IW.Point2D(-this.halfWidth,-this.halfHeight);
	//Transformed points
	this.t1 = new IW.Point2D(-this.halfWidth,this.halfHeight);
	this.t2 = new IW.Point2D(this.halfWidth,this.halfHeight);
	this.t3 = new IW.Point2D(this.halfWidth,-this.halfHeight);
	this.t4 = new IW.Point2D(-this.halfWidth,-this.halfHeight);	
	//Position & Scale & Angle
	if(arguments.length>2)	this.position = new IW.Point2D(x, y);
	else					this.position = new IW.Point2D(0,0);
	this.scale = 1;
	this.angle = 0;	//Radians
	//Final scale, rotation and translate from parent
	this.refScale = 1;
	this.refAngle = 0;
	this.refTranslate = new IW.Point2D(0,0);
	//0,0 es el punto p4 escalado del padre
	this.oParent = new IW.Point2D(0,0);	
	//Final values for transformation, this is calculated in update time using transformations
	this.fScale = 1;
	this.fAngle = 0;
	this.fTranslate = new IW.Point2D(0,0);	
	this.cosFAngle = 0;
	this.sinFAngle = 0;
	this.cosREFAngle = 0;
	this.sinREFAngle = 0;
	
	//this.widthParent = IW.canvas.width;
	//this.heightParent = IW.canvas.height;
	this.widthParent = window.innerWidth;
	this.heightParent = window.innerHeight;	
	this.halfWidthParent = this.widthParent/2;
	this.halfHeightParent = this.heightParent/2;
	
	this.isTouchable = false;
	this.isCollisionable = false;

};

IW.Drawable.prototype = {
	width : null,
	height : null,
	halfWidth : null,
	halfHeight : null,
	p1 : null,
	p2 : null,
	p3 : null,
	p4 : null,
	t1 : null,
	t2 : null,
	t3 : null,
	t4 : null,
	scale : null,
	angle : null,//Radians
	position : null,
	refScale : null,
	refAngle : null,
	refTranslate : null,
	oParent : null,
	widthParent : null,
	heightParent : null,
	halfWidthParent : null,
	halfHeightParent : null,
	halign : null,
	valign : null,
	id : null,
	type : null,
	isTouchable : null,
	isCollisionable : null,
	fScale : null,
	fAngle : null,
	fTranslate : null,
	cosFAngle : null,
	sinFAngle : null,
	cosREFAngle : null,
	sinREFAngle : null
};

IW.Drawable.prototype.updateRelative = function(){
	this.fScale = this.scale * this.refScale;
	this.fAngle = this.angle + this.refAngle;
	this.cosFAngle = Math.cos(this.fAngle);
	this.sinFAngle = Math.sin(this.fAngle);
	
	if(this.oParent.x == 0 && this.oParent.y == 0){
		this.fTranslate.x = this.position.x;
		this.fTranslate.y = this.position.y;
	}else{
		//Scale
		this.fTranslate.x = this.oParent.x + this.position.x * this.refScale;
		this.fTranslate.y = this.oParent.y + this.position.y * this.refScale;
		this.cosREFAngle = Math.cos(this.refAngle);
		this.sinREFAngle = Math.sin(this.refAngle);
		//Rotation + Translate
		var tx = this.fTranslate.x*this.cosREFAngle - this.fTranslate.y*this.sinREFAngle;
		var ty = this.fTranslate.x*this.sinREFAngle + this.fTranslate.y*this.cosREFAngle;
		this.fTranslate.x = tx + this.refTranslate.x;
		this.fTranslate.y = ty + this.refTranslate.y;
	}

	//SCALE
	this.t1.x = this.p1.x * this.fScale;
	this.t1.y = this.p1.y * this.fScale;
	this.t2.x = this.p2.x * this.fScale;
	this.t2.y = this.p2.y * this.fScale;
	this.t3.x = this.p3.x * this.fScale;
	this.t3.y = this.p3.y * this.fScale;
	this.t4.x = this.p4.x * this.fScale;
	this.t4.y = this.p4.y * this.fScale;	

	//ROTATION
	var x1 = this.t1.x*this.cosFAngle - this.t1.y*this.sinFAngle;
	var y1 = this.t1.x*this.sinFAngle + this.t1.y*this.cosFAngle;
	var x2 = this.t2.x*this.cosFAngle - this.t2.y*this.sinFAngle;
	var y2 = this.t2.x*this.sinFAngle + this.t2.y*this.cosFAngle;
	var x3 = this.t3.x*this.cosFAngle - this.t3.y*this.sinFAngle;
	var y3 = this.t3.x*this.sinFAngle + this.t3.y*this.cosFAngle;
	var x4 = this.t4.x*this.cosFAngle - this.t4.y*this.sinFAngle;
	var y4 = this.t4.x*this.sinFAngle + this.t4.y*this.cosFAngle;
	this.t1.x = x1;
	this.t1.y = y1;
	this.t2.x = x2;
	this.t2.y = y2;
	this.t3.x = x3;
	this.t3.y = y3;
	this.t4.x = x4;
	this.t4.y = y4;			
	
	//TRANSLATE
	this.t1.x = this.t1.x + this.fTranslate.x;
	this.t1.y = this.t1.y + this.fTranslate.y;
	this.t2.x = this.t2.x + this.fTranslate.x;
	this.t2.y = this.t2.y + this.fTranslate.y;
	this.t3.x = this.t3.x + this.fTranslate.x;
	this.t3.y = this.t3.y + this.fTranslate.y;
	this.t4.x = this.t4.x + this.fTranslate.x;
	this.t4.y = this.t4.y + this.fTranslate.y;			
	
};

IW.Drawable.prototype.enable = function(capability){
	switch(capability){
		case IW.D_TOUCH_DETECTION:
			this.isTouchable = true;
			//TouchManager.registerTouchableElement(this);
			break;
		case IW.D_COLLISION_DETECTION:
			this.isCollisionable = true;
			break;			
	}
};

IW.Drawable.prototype.onTouchDown = function(){};
IW.Drawable.prototype.onTouchMove = function(){};
IW.Drawable.prototype.onTouchUp = function(){};
IW.Drawable.prototype.onCollision = function(){};

IW.Drawable.prototype.setScale = function(scale){
	this.scale = scale;
};

IW.Drawable.prototype.rotate = function(rad){
	this.angle = rad;
};

IW.Drawable.prototype.rotateDeg = function(deg){
	this.angle = deg * Math.PI/180;
};

IW.Drawable.prototype.move = function(x, y){
	this.position.x = x;
	this.position.y = y;
};

IW.Drawable.prototype.setAlign = function(halign, valign){
	this.setHAlign(halign);
	this.setVAlign(valign);
};

IW.Drawable.prototype.setHAlign = function(halign){
	this.halign = halign;
	switch(halign){
		case IW.D_LEFT:
			this.position.x = this.halfWidth*this.scale;
			break;
		case IW.D_RIGHT:
			this.position.x = this.widthParent*this.refScale - this.halfWidth*this.scale;
			break;
		case IW.D_CENTER:
			this.position.x = this.halfWidthParent*this.refScale;
			break;
	}
};

IW.Drawable.prototype.setVAlign = function(valign){
	this.valign = valign;
	switch(valign){
		case IW.D_TOP:
			this.position.y = this.heightParent*this.refScale - this.halfHeight*this.scale;
			break;
		case IW.D_BOTTOM:
			this.position.y = this.halfHeight*this.scale;
			break;
		case IW.D_CENTER:
			this.position.y = this.halfHeightParent*this.refScale;
			break;
	}
};

IW.Drawable.prototype.isTouched = function(p){//p -> point (x,y)
	if(this.isTouchable){
		//t1 t2 t3
		var or1 = (this.t1.x - this.t3.x) * (this.t2.y - this.t3.y) - (this.t1.y - this.t3.y) * (this.t2.x - this.t3.x);
		//t1 t2 p
		var or11 = (this.t1.x - p.x) * (this.t2.y - p.y) - (this.t1.y - p.y) * (this.t2.x - p.x);
		//t2 t3 p
		var or12 = (this.t2.x - p.x) * (this.t3.y - p.y) - (this.t2.y - p.y) * (this.t3.x - p.x);
		//t3 t1 p
		var or13 = (this.t3.x - p.x) * (this.t1.y - p.y) - (this.t3.y - p.y) * (this.t1.x - p.x);
		
		if(or1 >= 0){
			if(or11 >= 0 && or12 >= 0 && or13 >= 0){
				return true;
			}
		}else{
			if(or11 < 0 && or12 < 0 && or13 < 0){
				return true;
			}
		}
		
		//t1 t3 t4
		var or2 = (this.t1.x - this.t4.x) * (this.t3.y - this.t4.y) - (this.t1.y - this.t4.y) * (this.t3.x - this.t4.x);
		//t1 t3 p
		var or21 = (this.t1.x - p.x) * (this.t3.y - p.y) - (this.t1.y - p.y) * (this.t3.x - p.x);
		//t3 t4 p
		var or22 = (this.t3.x - p.x) * (this.t4.y - p.y) - (this.t3.y - p.y) * (this.t4.x - p.x);
		//t4 t1 p
		var or23 = (this.t4.x - p.x) * (this.t1.y - p.y) - (this.t4.y - p.y) * (this.t1.x - p.x);

		if(or2 >= 0){
			return (or21 >= 0 && or22 >= 0 && or23 >= 0);
		}else{
			return (or21 < 0 && or22 < 0 && or23 < 0);
		}		
	}
	return false;
};

IW.Drawable.prototype.drawDebugBox = function(){
	IW.drawEdge(this.t1,this.t2,"#ff0000");
	IW.drawEdge(this.t2,this.t3,"#ff0000");
	IW.drawEdge(this.t3,this.t4,"#ff0000");
	IW.drawEdge(this.t4,this.t1,"#ff0000");
}

/* --- SPRITE ---*/
IW.Sprite = function(x, y, width, height, img, frameArray, currentAnimation, loop){
	IW.Drawable.call(this, x, y, width, height);//Es como hacer super(x,y,width,height);
	this.img = img;
	this.frameArray = frameArray;
	this.currentAnimation = currentAnimation;
	this.currentFrame = 0;
	this.loop = loop;
	this.inAnimation = true;
	this.pause = false;
	this.frameDelay = 2;
	this.drawNewFrame = 0;
};
IW.Sprite.prototype = new IW.Drawable();

IW.Sprite.prototype.inAnimation = false;
IW.Sprite.prototype.loop = true;
IW.Sprite.prototype.pause = false;
IW.Sprite.prototype.frameDelay = 2;
IW.Sprite.prototype.drawNewFrame = 0;

IW.Sprite.prototype.img = null;
IW.Sprite.prototype.frameArray = null;
IW.Sprite.prototype.currentAnimation = null;
IW.Sprite.prototype.currentFrame = null;
IW.Sprite.prototype.alpha = 1.0;

IW.Sprite.prototype.animate = function(){
	if(!this.pause){
		if(this.inAnimation){
			if(this.drawNewFrame<this.frameDelay){
				this.drawNewFrame++;
			}else{
				this.drawNewFrame = 0;
				if(this.currentFrame == (this.frameArray[this.currentAnimation].length-1)){
					if(this.loop) 	this.currentFrame = 0;
					else			this.inAnimation = false;
				}else{
					this.currentFrame++;
				}
			}
		}
	}
}

IW.Sprite.prototype.update = function(){
	this.updateRelative();
	this.animate();
	IW.context.save();
	IW.context.translate(this.position.x, this.position.y);
	IW.context.scale(this.scale, this.scale);
	IW.context.rotate(this.angle);
	IW.context.drawImage(	this.img, 
					this.frameArray[this.currentAnimation][this.currentFrame][0], this.frameArray[this.currentAnimation][this.currentFrame][1],
					this.frameArray[this.currentAnimation][this.currentFrame][2], this.frameArray[this.currentAnimation][this.currentFrame][3],
					-this.halfWidth, -this.halfHeight, this.width, this.height);
	IW.context.restore();
}

/* --- TEXT ---*/
IW.Text = function(text){
	IW.Drawable.call(this, 0, 10, 100,50);
	this.text = text;
	this.color = "#000000";
	this.font = "Arial";
	this.size = "18";
};
IW.Text.prototype = new IW.Drawable();
IW.Text.prototype.text = null;
IW.Text.color = null;
IW.Text.prototype.font = null;
IW.Text.prototype.size = null;
IW.Text.prototype.update = function(){
	this.updateRelative();
	IW.context.save();
	IW.context.translate(this.position.x, this.position.y);
	IW.context.scale(this.scale, this.scale);
	IW.context.rotate(this.angle);
	IW.context.fillStyle = this.color;
	IW.context.font = "bold " + this.size + " " + this.font;
	IW.context.fillText(this.text, this.position.x, this.position.y);
	IW.context.restore();
};

/* --- CIRCLE ---*/
IW.PI2 = Math.PI*2;

IW.Circle = function(x, y, r, color){
	this.diameter = r*2;
	IW.Drawable.call(this, x, y, this.diameter, this.diameter);
	this.radius = r;
	this.color = color;
};
IW.Circle.prototype = new IW.Drawable();
IW.Circle.prototype.diameter = null;
IW.Circle.prototype.radius = null;
IW.Circle.prototype.color = null;
IW.Circle.prototype.update = function(){
	this.updateRelative();
	IW.context.save();
	IW.context.translate(this.position.x, this.position.y);
	IW.context.scale(this.scale, this.scale);
	IW.context.rotate(this.angle);
	IW.context.beginPath();
	IW.context.strokeStyle = "none";
	IW.context.fillStyle = this.color;
	IW.context.arc(this.position.x, this.position.y, this.radius, 0, IW.PI2, true);
	IW.context.closePath();
	IW.context.fill();
	IW.context.restore();
};

/* --- WRAPPER ---*/
IW.Wrapper = function(x, y, width, height){
	IW.Drawable.call(this, x, y, width, height);//Es como hacer super(x,y,width,height);
	this.drawables = new Array();

};
IW.Wrapper.prototype = new IW.Drawable();
IW.Wrapper.prototype.drawables = null;

IW.Wrapper.prototype.addDrawableEntity = function(entity){
	entity.widthParent = this.width;
	entity.heightParent = this.height;
	entity.halfWidthParent = this.halfWidth;
	entity.halfHeightParent = this.halfHeight;
	this.drawables.push(entity);
};
IW.Wrapper.prototype.removeDrawableEntity = function(index){
	return this.drawables.splice(i,1)[0];
};

IW.Wrapper.prototype.update = function(){
	this.updateRelative();
	var ox = this.p4.x * this.scale;
	var oy = this.p4.y * this.scale;
	var cosAngle = Math.cos(this.angle);
	var sinAngle = Math.sin(this.angle);
	var tx = ox*cosAngle - oy*sinAngle;
	var ty = ox*sinAngle + oy*cosAngle;
	ox = tx;
	oy = ty;
	ox = ox + this.position.x;
	oy = oy + this.position.y;
	IW.context.save();
	IW.context.translate(ox, oy);
	IW.context.scale(this.scale, this.scale);
	IW.context.rotate(this.angle);	
	
	for(var i=0;i<this.drawables.length;i++){		
		this.drawables[i].refScale = this.fScale;
		this.drawables[i].refAngle = this.fAngle;
		this.drawables[i].refTranslate.x = this.fTranslate.x;
		this.drawables[i].refTranslate.y = this.fTranslate.y;
		this.drawables[i].oParent.x = this.p4.x*this.fScale;
		this.drawables[i].oParent.y = this.p4.y*this.fScale;			
		this.drawables[i].update();
	}		
	
	IW.context.restore();
};

/* --- ARRAY ---*/
IW.Array = function(index){
	this.array = new Array();
};
IW.Array.prototype.array = null;
IW.Array.prototype.add = function(e){
	this.array.push(e);
};
IW.Array.prototype.remove = function(i){
	return this.array.splice(i,1)[0];
};

/* --- DEALER --- */
IW.Dealer = function(array){
	this.array = array;
}
IW.Dealer.prototype.giveMeOne = function(){
	return this.array.splice((Math.random()*this.array.length)<<0,1)[0];//Splice retorna un subarray, cómo sólo estoy pidiendo un elemento, [0]
}
IW.Dealer.prototype.returnOne = function(e){
	this.array.push(e);
}


