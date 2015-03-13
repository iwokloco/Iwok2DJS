var IW = {
	autor:"Ramón Hernández Calvo", 
	email:"iwokloco@gmail.com", 
	version:"alfa 2", 
	canvas: null, 
	context: null,
};

IW.LoopManager = function(){
	this.iwokInstances = new Array();
	this.threads = new Array();
}
IW.LoopManager.prototype.generateLoops = function(){
	for(var i=0;i<IW.looper.iwokInstances.length;i++){
		eval("setInterval(function(){ IW.looper.iwokInstances["+i+"].loop();}, 1000/IW.looper.iwokInstances["+i+"].canvasFPS);");
	}
}
IW.LoopManager.prototype.startInstances = function(){
	for(var i=0;i<IW.looper.iwokInstances.length;i++){
		console.log("start: " +IW.looper.iwokInstances[i].canvasID);
		IW.looper.iwokInstances[i].start();
	}		
}
IW.LoopManager.prototype.addIwokInstance = function(iwokInstance){
	this.iwokInstances.push(iwokInstance);
}
IW.looper = new IW.LoopManager();



IW.Iwok2D = function(){
	IW.looper.addIwokInstance(this);
	//SETUP VALUES
	this.customSetup = false;
	this.canvasWidth = window.innerWidth;
	this.canvasHeight = window.innerHeight;
	this.canvasID = "iwok2Dcanvas";
	this.canvasFPS = 30;
	this.canvasRetina = false;
	this.dpi = 1;
	this.keyEvents = false;
	this.mouseEvents = false;
	this.touchEvents = false;
	//CANVAS INSTANCE
	this.canvas = null;
	this.context = null;
	//GAME ENGINE
	this.gameStates = new Array();
	this.runState = 0;
	this.nextState = 1;
	this.currentMode = this.MODE_RUN;
}

IW.Iwok2D.prototype.setup = function(jsonSetup){
	this.customSetup = true;
	if(jsonSetup.width != undefined) this.canvasWidth = jsonSetup.width;
	if(jsonSetup.height != undefined) this.canvasHeight = jsonSetup.height;
	if(jsonSetup.canvasID != undefined) this.canvasID = jsonSetup.canvasID;
	if(jsonSetup.canvasFPS != undefined) this.canvasFPS = jsonSetup.canvasFPS;
	if(jsonSetup.canvasRetina != undefined) this.canvasRetina = jsonSetup.canvasRetina;
	if(jsonSetup.keyEvents != undefined) this.keyEvents = jsonSetup.keyEvents;
	if(jsonSetup.mouseEvents != undefined) this.mouseEvents = jsonSetup.mouseEvents;
	if(jsonSetup.touchEvents != undefined) this.touchEvents = jsonSetup.touchEvents;
}

IW.Iwok2D.prototype.start = function(){
	if(this.customSetup){
		if(document.getElementById(this.canvasID) == null){
			this.canvas = document.createElement("canvas");
			this.canvas.id = this.canvasID;
			document.body.appendChild(this.canvas);
		}else{
			this.canvas = document.getElementById(this.canvasID);
		}
		this.context = this.canvas.getContext("2d");
		this.canvas.width = this.canvasWidth*this.dpi;
		this.canvas.height = this.canvasHeight*this.dpi;
		this.canvas.style.width = this.canvasWidth+"px";
		this.canvas.style.height = this.canvasHeight+"px";
	}else{
		this.canvas = document.createElement("canvas");
		this.canvas.id = this.canvasID;
		document.body.appendChild(this.canvas);
		this.context = this.canvas.getContext("2d");
		this.canvas.width = this.canvasWidth;
		this.canvas.height = this.canvasHeight;
		this.canvas.style.width = this.canvasWidth+"px";
		this.canvas.style.height = this.canvasHeight+"px";			
	}
}

IW.Iwok2D.prototype.MODE_INIT = 0;
IW.Iwok2D.prototype.MODE_RUN = 1;
IW.Iwok2D.prototype.MODE_TRANSITION = 2;
IW.Iwok2D.prototype.MODE_PAUSE = 3;
IW.Iwok2D.prototype.MODE_RESUME = 4;
IW.Iwok2D.prototype.MODE_FINISH = 5;	

IW.Iwok2D.prototype.loop = function(){
	IW.canvas = this.canvas;
	IW.context = this.context;
	IW.clear();
	switch(this.currentMode){
		case this.MODE_INIT_GS:
			this.init();
			break;
		case this.MODE_RUN:
			this.run();
			break;		
		case this.MODE_TRANSITION:
			this.runTransition();
			break;
		case this.MODE_PAUSE:
			//Manage application sleep
				//Save application State
			break;
		case this.MODE_RESUME:
			//Manage application resume
				//Reload application State
			break;
		case this.MODE_FINISH:
			//Manage exit of application
				//Save information and free resources
		break;			
	}
}

IW.Iwok2D.prototype.addGameState = function(gs){
	this.gameStates.push(gs);
}

IW.Iwok2D.prototype.run = function(){
	this.gameStates[this.runState].update();
}

IW.Iwok2D.prototype.init = function(){
	this.gameStates[this.runState].init();
	this.currentMode = this.MODE_RUN;
}

IW.Iwok2D.prototype.changeGameState = function(n_gs){
	this.nextState = n_gs;
	this.gameStates[this.nextState].init();
	this.currentMode = this.MODE_TRANSITION;
	this.transition.init();
}

IW.Iwok2D.prototype.runTransition = function(){
	this.transition.update();
}

IW.Iwok2D.prototype.changeGameState_t = function(n_gs){
	this.runState = n_gs;
}

function init(){
	window.scrollTo(0,1);//Hide address bar ios
	document.ontouchmove = function(e){ e.preventDefault(); }//disable scroll ios
	main();
	IW.looper.startInstances();
	IW.looper.generateLoops();
	IW.addKeyEvents();
}
window.onload = init;