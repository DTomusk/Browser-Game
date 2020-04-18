// a level is just a bunch of objects 
class Level {
	constructor(width, height, objects) {
		this.width = width;
		this.height = height;
		this.objects = objects;
	}
}

// every object in the world is an instance of object 
// there will be subclasses for dynamic and static objects 
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

// singl rectangles
class Component {
	constructor(x, y, width, height, colour) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.colour = colour;
	}
}