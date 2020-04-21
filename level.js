// a level is just a bunch of objects 
class Level {
	constructor(width, height, foreground, midground, background, actors) {
		this.width = width;
		this.height = height;
		// non collidable objects in front of the player
		this.foreground = foreground;
		// collidable objects
		this.midground = midground;
		// non collidable objects behind the player
		this.background = background;
		this.actors = actors;
		// the speech here is a string taken from an npc's speech array 
		this.speech = null;
		this.speaker = null;
		this.convIndex = null;
	}
}

// every object in the world is an instance of object 
// there will be subclasses for dynamic and static objects 
// objects should be lists of components not single rectangles (like oak is at the moment )
class Object {
	constructor(x, y, width, height, parts) {
		// coordinates where spawned 
		this.x = x;
		this.y = y;
		// bounding box
		this.width = width;
		this.height = height;
		// you get parts passed in, parts are components
		this.parts = parts;
	}

	draw(xSfhit, yShift) {
		this.parts.forEach(comp => {
			ctx.fillStyle = comp.colour;
			ctx.fillRect(comp.x+this.x-xSfhit, comp.y+this.y-yShift, comp.width, comp.height);
		})
	}
}

// not all actors need the same capabilities as the player, far from it
// the player needs to be able to do everything that a given actor can do 
// but actors each only need to be capable of a small number of things 
class Actor extends Object {
	constructor(x, y, width, height, parts) {
		super(x, y, width, height, parts);
		this.vx = 0;
		this.vy = 0;
		// I still think we need this, I haven't found a solution that doesn't use this yet 
		this.walkingOn = null;
		this.state = "air";
	}
}

class NPC extends Actor {
	constructor(x, y, width, height, parts, behaviour) {
		super(x, y, width, height, parts);
		this.behaviour = behaviour
	}
}

class Talker extends NPC {
	constructor(x, y, width, height, parts, behaviour, speech) {
		super(x, y, width, height, parts, behaviour);
		// script or speech should be a list of strings 
		this.speech = speech;
	}
}

class Door extends Object {
	constructor(x, y, width, height, destination) {
		super(x, y, width, height);
		this.parts = [new Component(0, 0, width, height, "white")];
		this.destination = destination;
	}
}

class Oak extends Object {
	constructor(x, y) {
		super(x, y, 200, 370);
		this.parts = [
			new Component(0,0,200,70,"green"),
			new Component(70, 70, 40, 300, "brown")
		];
	}
}

// single rectangles
class Component {
	constructor(x, y, width, height, colour) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.colour = colour;
	}
}