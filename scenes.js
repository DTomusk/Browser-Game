class Scene {
	constructor(actions) {
		this.actions = actions;
	}

	playScene(level) {
		console.log("Playing scene");
		this.actions.forEach(action => {
			console.log(action.constructor.name);
			if (action.constructor.name == "Pause") {
				sleep(action.duration);
			} else if (action.constructor.name == "Spawn") {
				level.actors.push(action.actor);
			}
		})
	}
}

class Action {

}

class Pause extends Action {
	constructor(duration) {
		super();
		this.duration = duration;
	}
}

class Spawn extends Action {
	constructor(actor, point) {
		super();
		this.actor = actor;
	}
}

class Move extends Action {
	constructor(actor, direction, distance) {

	}
}

class Speak extends Action {
	constructor(actor) {

	}
}

function sleep(duration) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < duration);
}