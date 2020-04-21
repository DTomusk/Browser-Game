// file for working out the logic of the game
function moveStuff(level, xShift, yShift, player) {

	level.actors.forEach(actor => {
		checkCollision(actor, level);
		// update position

		// need more conditionals for states, need more states
		// e.g, can't move when talking 
		// is this the right place for state related behaviour? 
		if (actor.state == "air") {
			actor.vy += g;
		} 
		if (actor instanceof NPC) {
			// deal with behaviour stuff, so that is decide what vx and vy are gonna be
		}
		// after updating vx and vy do the actual movement
		actor.x += actor.vx;
		actor.y += actor.vy;
		console.log(actor.state);
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

		if (actor.x + actor.width >= object.x &&
			actor.x <= object.x + object.width &&
			actor.y + actor.height > object.y && 
			actor.y < object.y + object.height) {
			actor.vx = 0
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