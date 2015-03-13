IW.KEY_0 = 48;
IW.KEY_1 = 49;
IW.KEY_2 = 50;
IW.KEY_3 = 51;
IW.KEY_4 = 52;
IW.KEY_5 = 53;
IW.KEY_6 = 54;
IW.KEY_7 = 55;
IW.KEY_8 = 56;
IW.KEY_9 = 57;
IW.KEY_A = 65;
IW.KEY_B = 66;
IW.KEY_C = 67;
IW.KEY_D = 68;
IW.KEY_E = 69;
IW.KEY_F = 70;
IW.KEY_G = 71;
IW.KEY_H = 72;
IW.KEY_I = 73;
IW.KEY_J = 74;
IW.KEY_K = 75;
IW.KEY_L = 76;
IW.KEY_M = 77;
IW.KEY_N = 78;
IW.KEY_O = 79;
IW.KEY_P = 80;
IW.KEY_Q = 81;
IW.KEY_R = 82;
IW.KEY_S = 83;
IW.KEY_T = 84;
IW.KEY_U = 85;
IW.KEY_V = 86;
IW.KEY_W = 87;
IW.KEY_X = 88;
IW.KEY_Y = 89;
IW.KEY_Z = 90;

IW.keyPressListeners = new Array(256);
IW.keyUpListeners = new Array(256);
IW.addKeyPressEvent = function(key, func){
	IW.keyPressListeners[key] = func;
}
IW.addKeyUpEvent = function(key, func){
	IW.keyUpListeners[key] = func;
}
IW.keyPressEventsManager = function(e){
	try{IW.keyPressListeners[e.keyCode]();}catch(err){}
}
IW.keyUpEventsManager = function(e){
	try{IW.keyUpListeners[e.keyCode]();}catch(err){}
}
IW.addKeyEvents = function(){
	document.onkeydown = function(event){
		IW.keyPressEventsManager(event);
	};
	document.onkeyup = function(event){
		IW.keyUpEventsManager(event);
	};
}