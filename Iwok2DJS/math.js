//Retorna el punto de intersección entre dos líneas rectas
function intersectionLines(	u1x, u1y, u2x, u2y,
							v1x, v1y, v2x, v2y){
	/* 
		y = m(x - xo) + yo	:	Ecuación de la recta en forma punto pendiente
		y = mx + b			:	Ecuación de la recta en la forma pendiente-intersección
	*/
	//Cálculo de pendientes
	var m1 = (u2y - u1y) / (u2x - u1x);
	var m2 = (v2y - v1y) / (v2x - v1x);

	//Cálculo de 'b' cogiendo como punto (xo,yo) = u1 y v1
	var b1 = (- (u1x) * (m1)) + (u1y);
	var b2 = (- (v1x) * (m2)) + (v1y);
	
	//Cálculo del punto de intersección entre las dos rectas
	var ix = (b2 - b1) / (m1 - m2);
	var iy = m1 * ix + b1;
	
	return [ix, iy];
}

function intersectionVectors(	u1x, u1y, u2x, u2y,
								v1x, v1y, v2x, v2y){
	/* 
		y = m(x - xo) + yo	:	Ecuación de la recta en forma punto pendiente
		y = mx + b			:	Ecuación de la recta en la forma pendiente-intersección
	*/
	//Cogemos los valores mín y max de las coordenadas
	var xmin = u1x;
	var xmax = u1x;
	var ymin = u1y;
	var ymax = u1y;
	if(xmin > u2x) xmin = u2x;
	if(xmin > v1x) xmin = v1x;
	if(xmin > v2x) xmin = v2x;
	if(xmax < u2x) xmax = u2x;
	if(xmax < v1x) xmax = v1x;
	if(xmax < v2x) xmax = v2x;
	if(ymin > u2y) ymin = u2y;
	if(ymin > v1y) ymin = v1y;
	if(ymin > v2y) ymin = v2y;
	if(ymax < u2y) ymax = u2y;
	if(ymax < v1y) ymax = v1y;
	if(ymax < v2y) ymax = v2y;		
	
	//Cálculo de pendientes
	var m1 = (u2y - u1y) / (u2x - u1x);
	var m2 = (v2y - v1y) / (v2x - v1x);

	//Cálculo de 'b' cogiendo como punto (xo,yo) = u1 y v1
	var b1 = (- (u1x) * (m1)) + (u1y);
	var b2 = (- (v1x) * (m2)) + (v1y);
	
	//Cálculo del punto de intersección entre las dos rectas
	var ix = (b2 - b1) / (m1 - m2);
	var iy = m1 * ix + b1;
	
	if(ix >= xmin && ix <= xmax && iy >= ymin && iy <= ymax) return [ix, iy];
	else return [0,0];
}

function getDistance(xo, yo, xf, yf){
	var a = xo-xf;
	var b = yo-yf;
	return ((100*Math.sqrt(a*a+b*b))<<0)/100;
}

function getAngle(xo, yo, xf, yf){
	var a = xo-xf;
	var b = yo-yf;
	var theta = Math.atan2(-b, a);
	if (theta < 0) theta += 2 * Math.PI;
	return ((100*theta)<<0)/100;;
}

function round(n){
	return (0.5+n) << 0;
}



var IWMath = {
	intersectionLines : intersectionLines,
	intersectionVectors : intersectionVectors,
	getDistance : getDistance,
	getAngle : getAngle,
	round : round,
	oneDegInRad : Math.PI/180,
	rad360: 2*Math.PI,
}