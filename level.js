// a level is just a bunch of objects 
class Level {
	constructor(width, height, foreground, midground, background, actors, interactables) {
		this.width = width;
		this.height = height;
		// non collidable objects in front of the player
		this.foreground = foreground;
		// collidable objects
		this.midground = midground;
		this.interactables = interactables;
		// non collidable objects behind the player
		this.background = background;
		this.actors = actors;
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

	draw() {
		this.parts.forEach(comp => {
			ctx.fillStyle = comp.colour;
			ctx.fillRect(comp.x+this.x, comp.y+this.y, comp.width, comp.height);
		})
	}
}

class Actor extends Object {
	constructor(x, y, width, height, parts) {
		super(x, y, width, height, parts);
		this.vx = 0;
		this.vy = 0;
		this.walkingOn = null;
		this.state = "air";
	}

	draw() {
		this.parts.forEach(comp => {
			ctx.fillStyle = comp.colour;
			ctx.fillRect(comp.x+this.x, comp.y+this.y, comp.width, comp.height);
		})
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

	draw() {
		this.parts.forEach(part => {
			ctx.fillStyle = part.colour;
			ctx.fillRect(part.x+this.x, part.y+this.y, part.width, part.height);
		});
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