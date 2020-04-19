// file for drawing the game 
function drawStuff(level, xShift, yShift) {
	drawBG(level);
	// this should all be relative to the camera
	level.background.forEach(element => element.draw(xShift, yShift));
	level.interactables.forEach(element => element.draw(xShift, yShift));
	level.actors.forEach(actor => actor.draw(xShift, yShift));
	level.midground.forEach(element => element.draw(xShift, yShift));
	level.foreground.forEach(element => element.draw(xShift, yShift));
}

function drawBG(level) {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,level.width,level.height);
}

function clearScreen() {
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
}