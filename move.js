// file for working out the logic of the game
function moveStuff(level, xShift, yShift, player) {

	level.actors.forEach(actor => {
		if (actor.state == "air") {
			actor.vy += g;
		} 
		if (actor instanceof NPC) {
			handleBehaviour(actor, player);
		}
		checkCollision(actor, level);
		actor.x += actor.vx;
		actor.y += actor.vy;
	})

	// camera
	if ((player.x - xShift > 2*canvas.width/3 && player.vx > 0 && xShift < level.width - canvas.width) || (player.x - xShift < canvas.width/3 && player.vx < 0 && xShift > 0)) {
		xShift += player.vx;
	};
	if ((player.y - yShift > 2*canvas.height/3 && player.vy > 0 && yShift < level.height - canvas.height) || (player.y - yShift < canvas.height/3 && player.vy < 0 && yShift > 0)) {
		yShift += player.yx;
	};
	return [xShift, yShift];
}

function checkCollision(actor, level) {
	// only works out collision between actors and midground objects
	level.midground.forEach(object => {
		// checks collision in all four directions
		// this can be simplified down to two statements (can they?)
		if (actor.y + actor.height + actor.vy > object.y &&
			actor.y < object.y + object.height &&
			actor.x + actor.width > object.x && 
			actor.x < object.x + object.width) {
			if (actor.vy > 0) {
				actor.vy = 0;
				actor.y = object.y - actor.height;
				actor.walkingOn = object;
				actor.state = "ground";
			} else if (actor.vy < 0) {
				actor.vy = 0;
				actor.y = object.y + actor.height;
			}
		}

		if (actor.x + actor.width + actor.vx >= object.x &&
			actor.x +actor.vx <= object.x + object.width &&
			actor.y + actor.height > object.y && 
			actor.y < object.y + object.height) {
			if (actor.vx > 0) {
				actor.x = object.x - actor.width - actor.vx;
			} else if (actor.vx < 0) {
				actor.x = object.x + object.width - actor.vx;
			}
		}
	})

	// canvas boundary collision
	// probably won't be necessary in the end 
	if (actor.x + actor.vx < 0) {
		actor.x = 0;
		actor.vx = 0;
	};
	if (actor.x + actor.width + actor.vx > level.width) {
		actor.x = level.width - actor.width;
		actor.vx = 0;
	};
	if (actor.y + actor.vy < 0) {
		actor.y = 0;
		actor.vy = 0;
	};
	if (actor.y + actor.height + actor.vy > level.height) {
		actor.y = level.height - actor.height;
		actor.vy = 0;
		actor.walkingOn = "Sunshine";
		actor.state = "ground";
	};

	// some fudging for falling off things 
	if (actor.walkingOn != null) {
		if (actor.x + actor.width < actor.walkingOn.x || actor.x > actor.walkingOn.x + actor.walkingOn.width) {
			actor.state = "air";
		}
	}
}

function handleBehaviour(actor, player) {
	switch (actor.behaviour) {
		case "walk left":
			actor.vx = -3;
			break;
		case "pursue":
			d=distanceBetween(actor, player);
			if (d <= 300 && d >= 20){
				if (actor.x-player.x < 0){
					actor.vx = 2;
				} else {
					actor.vx = -2
				}
			} else {
				actor.vx = 0;
			}
	}
}

function distanceBetween(object1, object2) {
	dy = (object1.y+object1.height/2)-(object2.y+object2.height/2)
	dx = (object1.x+object1.width/2)-(object2.x+object2.width/2)
	dy2 = dy*dy;
	dx2 = dx*dx;
	return Math.sqrt(dy2+dx2);
}

function playerNear(player, item) {
	if (player.x + player.width/2 > item.x - 10 &&
		player.x + player.width/2 < item.x + item.width + 10 &&
		player.y + player.height/2 > item.y - 10 &&
		player.y + player.height/2 < item.y + item.height + 10) {
		return true;
	} else {
		return false
	}
}