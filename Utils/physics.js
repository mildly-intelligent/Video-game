// Physics handling
// Noah D.
// 11-12-2025
/*

*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

/**
 * Class for storing 2d points
 * @deprecated
 */
class Point {
	/**
	 * @param {number} v1 
	 * @param {number} v2 
	 */
	constructor(v1, v2) {
		this.x = v1;
		this.y = v2;
	}

	/**
	 * @param {Field} f Field to check
	 * @returns {bool} If the point is in field, return true
	 */
	inField(f) {
		return (f.x <= this.x && this.x <= f.x+f.w) && (f.y <= this.y && this.y <= f.y+f.h);
	}

	/**
	 * Distance from origin
	 * @returns {number}
	 */
	get length() {
		return sqrt(this.x**2 + this.y**2);
	}
}

class Field {
	/**
	 * @param {number} x Top left of field
	 * @param {number} y Top right of field
	 * @param {number} w Width of field
	 * @param {number} h Height of field
	 */
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	/**
	 * Top left of field
	 * @returns {{x:number, y:number}}
	*/
	get origin() {
		return {x: this.x, y: this.y};
	}
	/**
	 * @param {number} v.x
	 * @param {number} v.y 
	 */
	set origin(v) {
		this.x = v.x;
		this.y = v.y;
	}

	/**
	 * Checks if two fields intersect
	 * @param {Field} f Field to check, order doesn't matter
	 * @param {Object} offset Offset `this` before calculation
	 * @param {number} offset.x 
	 * @param {number} offset.y 
	 * @returns {bool} If there was a collision
	 */
	intersects(f, offset={x:0,y:0}) {
		// Top-Left point of first field
		let l1 = {x: this.x+offset.x, y: this.y+offset.y};
		// Bottom-Right point of first field
		let r1 = {x: this.x+offset.x+this.w, y: this.y+offset.y+this.h};
		
		// Top-Left point of first field
		let l2 = f.origin;
		// Bottom-Right point of first field
		let r2 = {x: f.x+f.w, y: f.y+f.h};

		// Checks if each edge is outside the second field
		if (l1.x >= r2.x || l2.x >= r1.x || r1.y <= l2.y || r2.y <= l1.y) {
			return false;
		} else {
			return true;
		}
	}
}



/**
 * Base class for physics objects
 */
class _PhysicsObject {
	/**
	 * @param {Field} hitbox Hitbox of the object
	 * @param {bool} do_collide
	 * @constructor
	 */
	constructor(hitbox, do_collide) {
		this.hitbox = hitbox;
		this.do_collide = do_collide;
	}

	get pos() {
		return this.hitbox.origin;
	}
	set pos(v) {
		this.hitbox.origin = v;
	}
}

class _NonDynamicPhysObj extends _PhysicsObject {
	constructor(hitbox, do_collide) {
		super(hitbox, do_collide);
		this.top = new Field(
			this.hitbox.x+this.hitbox.w/12, this.hitbox.y,
			this.hitbox.w*5/6, this.hitbox.h / 10,
		);
	}
}

class StaticPhysObj extends _NonDynamicPhysObj {
	constructor(hitbox, do_collide) {
		super(hitbox, do_collide);
	}

	register() {
		state.register.physics.static.push(this);
	}
}

class PathPhysObj extends _NonDynamicPhysObj {
	/**
	 * @param {Field} hitbox 
	 * @param {bool} do_collide 
	 * @param {{x:number,y:number}[]} path 
	 * @param {number} speed 
	 * @param {bool} loop
	 */
	constructor(hitbox, do_collide, path, speed, loop) {
		super(hitbox, do_collide);
		this.path = path;
		this.progress = 0;
		this.speed = speed;
		this.do_loop = loop;

		// 0: Forwards
		// 1: Backwards
		// 2: Stopped
		this.movement_type = 0;
	}

	get slice() {
		return int(this.progress);
	}

	get progressInSlice() {
		return fract(this.progress);
	}

	get vel() {
		let sliceStart = this.path[this.slice];
		let sliceEnd = this.path[this.slice + 1];

		let x = lerp(sliceStart.x, sliceEnd.x, 0.01) - sliceStart.x;
		let y = lerp(sliceStart.y, sliceEnd.y, 0.01) - sliceStart.y;
		
		x *= this.speed * 10;
		y *= this.speed * 10;

		x *= this.movement_type == 1 ? -1 : 1;
		y *= this.movement_type == 1 ? -1 : 1;

		return {x:x, y:y};
	}

	tick(dt) {
		switch (this.movement_type) {
			case 0:
				this.progress += this.speed * dt/1000;
			break;
			case 1:
				this.progress -= this.speed * dt/1000;
			break;
			case 2:
				void(0)
			break;
		}
		if (this.progress > this.path.length-1) {
			if (this.do_loop) this.movement_type = 1;
			else this.movement_type = 2;

			this.progress = this.slice - 0.0001;
		} else if (this.progress < 0) {
			this.movement_type = 0;
			this.progress = 0.0001;
		}

		let sliceStart = this.path[this.slice];
		let sliceEnd = this.path[this.slice + 1];

		let pos = {
			x: lerp(sliceStart.x, sliceEnd.x, this.progressInSlice),
			y: lerp(sliceStart.y, sliceEnd.y, this.progressInSlice),
		};

		this.hitbox.origin = pos;
		this.top.origin = pos;
	}

	register() {
		state.register.physics.path.push(this);
		return this;
	}
}

class DynamicPhysObj extends _PhysicsObject {
	constructor(hitbox, vel, do_collide, do_gravity) {
		super(hitbox, do_collide);
		this.vel = vel
		this.onFloor = false;
		this.do_gravity = do_gravity;

		this.theThingThatItsOnTopOf = null;
	}

	#check_collision() {
		let onFloor = false;
		let onPath = false;
		let objects = state.register.physics.static.concat(state.register.physics.path);
		for (let j = 0; j < objects.length; j++) {
			/** @type {_NonDynamicPhysObj} */
			let obj = objects[j];
			// If the object we're checking is not set to have collisions we can ignore it
			if (!obj.do_collide) {
				continue;
			}

			
			// Check if the object falls onto an object
			if (this.hitbox.intersects(obj.top)) {
				this.vel = {x:0,y:0};
				onFloor = true
				this.hitbox.y = obj.top.y - this.hitbox.h;
				break;
			// Check slightly below to make sure it's still above something
			} else if (this.hitbox.intersects(obj.hitbox, {x:0,y:1})) {
				// Variable to keep track of if the object is on top of *any* other object
				onFloor = true;
				if (obj.constructor.name == 'PathPhysObj') {
					this.theThingThatItsOnTopOf = obj;
					onPath = true;
				}
			}
			// Side and bottom collisions
			if (this.hitbox.intersects(obj.hitbox)) {
				// Bottom
				if (this.hitbox.y+this.hitbox.h > obj.hitbox.y+obj.hitbox.h) {
					this.hitbox.y = obj.hitbox.y + obj.hitbox.h;
					this.vel.y = 0;
				// Right wall
				} else if (this.hitbox.x > obj.hitbox.x + obj.hitbox.w/2) {
					this.hitbox.x = obj.hitbox.x + obj.hitbox.w;
					this.vel.x = 0;
				// Left wall
				} else {
					this.hitbox.x = obj.hitbox.x - this.hitbox.w
					this.vel.x = 0;
				}
				break;
			}
		}

		// If the object isn't on top of anything
		if (!onFloor) {
			this.onFloor = false;
		} else {
			this.onFloor = true;
		}

		if (!onPath) {
			this.theThingThatItsOnTopOf = null;
		}
	}

	#raycast() {
		// I might end up trying to implement raycasting if I experience problems with collisions
	}
	
	tick(dt) {
		if (this.do_gravity && !this.onFloor) {
			// Applies a smaller amount of acceleration if you are falling than if you are rising
			if (this.vel.y < 0) {
				this.vel.y += GRAVITY_DOWN*dt/1000;
			} else {
				this.vel.y += GRAVITY_UP*dt/1000;
			}
		}

		if (this.do_collide) {
			this.#check_collision()
		};

		if (this.theThingThatItsOnTopOf !== null) {
			this.vel.x += this.theThingThatItsOnTopOf.vel.x;
			this.vel.y += this.theThingThatItsOnTopOf.vel.y;
		}

		this.hitbox.x += this.vel.x * 10*dt/1000;
		this.hitbox.y += this.vel.y * 10*dt/1000;


		if (this.theThingThatItsOnTopOf !== null) {
			this.vel.x -= this.theThingThatItsOnTopOf.vel.x;
			this.vel.y -= this.theThingThatItsOnTopOf.vel.y;
		}
	}
}