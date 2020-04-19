// file for working out the logic of the game
function moveStuff(level) {

	level.actors.forEach(actor => {
		checkCollision(actor, level);
		// update position
		if (actor.state == "air") {
			actor.vy += g;
		} 
		actor.x += actor.vx;
		actor.y += actor.vy;
		// needs to be changed so relative to midground objects, not canvas boundary
		console.log(actor.state);
	})
}

function checkCollision(actor, level) {
	// only works out collision between actors and midground objects
	level.midground.forEach(object => {
		// checks collision in all four directions
		// this can be simplified down to two statements 
		if (actor.vy > 0 &&
			actor.y + actor.height + actor.vy > object.y &&
			actor.y < object.y + object.height &&
			actor.x + actor.width > object.x && 
			actor.x < object.x + object.width) {
			actor.vy = 0;
			actor.y = object.y - actor.height;
			actor.walkingOn = object;
			actor.state = "ground";
		}
		if (actor.vx > 0 &&
			actor.x + actor.width + actor.vx >= object.x &&
			actor.x <= object.x + object.width &&
			actor.y + actor.height > object.y && 
			actor.y < object.y + object.height) {
			actor.vx = 0;
			actor.x = object.x - actor.width - 2;
		}
		if (actor.vx < 0 &&
			actor.x + actor.width + actor.vx >= object.x &&
			actor.x <= object.x + object.width &&
			actor.y + actor.height > object.y && 
			actor.y < object.y + object.height) {
			actor.vx = 0;
			actor.x = object.x + object.width + 2;
		}
		if (actor.vy < 0 &&
			actor.y + actor.height + actor.vy > object.y &&
			actor.y < object.y + object.height &&
			actor.x + actor.width > object.x && 
			actor.x < object.x + object.width) {
			actor.vy = 0;
			actor.y = object.y + actor.height;
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