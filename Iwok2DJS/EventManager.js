var touchDown = 0;
var canX;
var canY;

function addEventsListeners(){
/*	IW.canvas.addEventListener(	"touchstart", 
							function(event){
								touchDown = 1;
								event.preventDefault();
								if(event.targetTouches.length>=1){
									canX = event.targetTouches[0].pageX - IW.canvas.offsetLeft;
									canY = event.targetTouches[0].pageY - IW.canvas.offsetTop;
								}
							}, false);
	IW.canvas.addEventListener(	"touchmove", 
							function(event){
								event.preventDefault();
								if(event.targetTouches.length>=1){
									canX = event.targetTouches[0].pageX - IW.canvas.offsetLeft;
									canY = event.targetTouches[0].pageY - IW.canvas.offsetTop;
								}			
							}, false);
	IW.canvas.addEventListener(	"touchend",
							function(event){
								touchDown = 0;
								event.preventDefault();
								if(event.targetTouches.length>=1){
									canX = event.targetTouches[0].pageX - IW.canvas.offsetLeft;
									canY = event.targetTouches[0].pageY - IW.canvas.offsetTop;
								}								
							}, false);*/
	IW.canvas.addEventListener(	"mousedown", 
							function(event){
								touchDown = 1;
								canX = event.pageX - IW.canvas.offsetLeft;
								canY = event.pageY - IW.canvas.offsetTop;								
							}, true);
	document.body.addEventListener(	"mouseup",
									function(event){
										touchDown = 0;
										canX = event.pageX - IW.canvas.offsetLeft;
										canY = event.pageY - IW.canvas.offsetTop;										
									}, false);								
	IW.canvas.addEventListener(	"mousemove", 
							function(event){
								canX = event.pageX - IW.canvas.offsetLeft;
								canY = event.pageY - IW.canvas.offsetTop;								
							}, false);
	console.log("Events created");
}

function removeEventsListeners(){
	IW.canvas.removeEventListener("touchstart",touchDown, false);
	IW.canvas.removeEventListener("touchmove",touchXY, false);
	IW.canvas.removeEventListener("touchend",touchUp, false);	
}

function isTouchDown(){
	return (touchDown == 1); 	
}