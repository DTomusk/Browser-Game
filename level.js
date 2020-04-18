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
	}
}

// every object in the world is an instance of object 
// there will be subclasses for dynamic and static objects 
// objects should be lists of components not single rectangles (like oak is at the moment )
class Object {
	constructor(x, y, width, height, colour, collidable) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.colour = colour;
		this.collidable = collidable;
	}

	draw() {
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

class Actor extends Object {
	constructor(x, y, width, height, colour, collidable) {
		super(x, y, width, height, colour, collidable);
		this.vx = 0;
		this.vy = 0;
		this.walkingOn = null;
		this.state = "air";
	}

	draw() {
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

//class Scenery extends Object {

//}

class Oak {
	constructor(x, y) {
		this.x = x;
		this.y = y;
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