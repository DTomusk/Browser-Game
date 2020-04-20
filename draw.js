// file for drawing the game 
function drawStuff(level, xShift, yShift) {
	drawBG(level);
	// this should all be relative to the camera
	level.background.forEach(element => element.draw(xShift, yShift));
	level.interactables.forEach(element => element.draw(xShift, yShift));
	level.actors.forEach(actor => actor.draw(xShift, yShift));
	level.midground.forEach(element => element.draw(xShift, yShift));
	level.foreground.forEach(element => element.draw(xShift, yShift));
	if (level.speech != null) {
		drawSpeech(level.speech, xShift, yShift);
	}
	// if there is text to display display it here in some sort of text box 
	// we may want to have various texts on screen at once, which complicates matters 
	// there will only ever be one speech bubble on screen at a time (I imagine), 
	// so having a single variable for speech may be fine
}

function drawBG(level) {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,level.width,level.height);
}

function drawSpeech(speech, xShift, yShift) {
	ctx.fillStyle = "white";
	ctx.fillRect(5, 5, canvas.width-10, 60);
	ctx.fillStyle = "black";
	ctx.fillRect(8, 8, canvas.width-13, 54);
	ctx.font = "50px Arial";
	ctx.fillStyle = "White";
	ctx.fillText(speech, 10, 50);
}

function clearScreen() {
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
}