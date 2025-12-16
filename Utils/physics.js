// Physics handling
// Noah D.
// 11-12-2025
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
	 * @returns {number} Member of enum {@link COLLISION}
	 */
	intersects(f) {
		// Top-Left point of first field
		let l1 = this.origin;
		// Bottom-Right point of first field
		let r1 = {x: this.x+this.w, y: this.y+this.h};
		// Top-Left point of first field
		let l2 = f.origin;
		// Bottom-Right point of first field
		let r2 = {x: f.x+f.w, y: f.y+f.h};

		// Checks if each edge is outside the second field
		if (l1.x >= r2.x || l2.x >= r1.x || r1.y <= l2.y || r2.y <= l1.y) {
			return COLLISION.NO_HIT;
		} else {
			if (r1.y > l2.y && l1.x > l2.x && r1.x < r2.x) {
				return COLLISION.FLOOR;
			} else if (r1.x > l2.x && l1.x < l2.x) {
				return COLLISION.LEFT;
			} else if (l1.x < r2.x && r1.x < r2.x) {
				return COLLISION.RIGHT;
			} else {
				return COLLISION.OTHER
			}
		}
	}
}



/**
 * Base class for physics objects
 */
class _PhysicsObject {
	/**
	 * @param {Field} hitbox Hitbox of the object
	 * @param {PhysicsFlags} flags See {@link PHYSICS_FLAGS}
	 * @constructor
	 */
	constructor(hitbox, flags) {
		this.hitbox = hitbox;
		this.flags = flags;
	}

	tick(dt) {
	}

	get pos() {
		return this.hitbox.origin;
	}
	set pos(v) {
		this.hitbox.origin = v;
	}

	/* #region === Flag Getters and Setters === */
	get layer0() { return boolean(this.flags & PHYSICS_FLAGS.LAYER_0);	}
	set layer0(v) {
		if (v) {
			this.flags |= (v << 0);
		} else {
			this.flags &= (~(2**0) & 0xFF);
		}
	}
	get layer1() { return boolean(this.flags & PHYSICS_FLAGS.LAYER_1); }
	set layer1(v) {
		if (v) {
			this.flags |= (v << 1);
		} else {
			this.flags &= (~(2**1) & 0xFF);
		}
	}
	get layer2() { return boolean(this.flags & PHYSICS_FLAGS.LAYER_2);	}
	set layer2(v) {
		if (v) {
			this.flags |= (v << 2);
		} else {
			this.flags &= (~(2**2) & 0xFF);
		}
	}
	get layer3() { return boolean(this.flags & PHYSICS_FLAGS.LAYER_3);	}
	set layer3(v) {
		if (v) {
			this.flags |= (v << 3);
		} else {
			this.flags &= (~(2**3) & 0xFF);
		}
	}

	get layer4() { return boolean(this.flags & PHYSICS_FLAGS.LAYER_4);	}
	set layer4(v) {
		if (v) {
			this.flags |= (v << 4);
		} else {
			this.flags &= (~(2**4) & 0xFF);
		}
	}
	get layer5() { return boolean(this.flags & PHYSICS_FLAGS.LAYER_5);	}
	set layer5(v) {
		if (v) {
			this.flags |= (v << 5);
		} else {
			this.flags &= (~(2**5) & 0xFF);
		}
	}
	get do_collide() { return boolean(this.flags & PHYSICS_FLAGS.DO_COLLIDE);	}
	set do_collide(v) {
		if (v) {
			this.flags |= (v << 6);
		} else {
			this.flags &= (~(2**6) & 0xFF);
		}
	}
	get gravity() { return boolean(this.flags & PHYSICS_FLAGS.GRAVITY);	}
	set gravity(v) {
		if (v) {
			this.flags |= (v << 7);
		} else {
			this.flags &= (~(2**7) & 0xFF);
		}
	}

	get layers() {
		return [
			this.layer0 ? 0 : undefined,
			this.layer1 ? 1 : undefined,
			this.layer2 ? 2 : undefined,
			this.layer3 ? 3 : undefined,
			this.layer4 ? 4 : undefined,
			this.layer5 ? 5 : undefined,
		].filter(item => item !== undefined);
	}

	/* #endregion === END === */
}

class StaticPhysObj extends _PhysicsObject {
	constructor(hitbox, flags) {
		super(hitbox, {x:0, y:0}, flags);
	}

	tick() {

	}

	register() {
		state.register.physics.static.push(this);
	}
}

class PathPhysObj extends _PhysicsObject {
	constructor(hitbox, flags, path) {
		this.hitbox = hitbox;
		this.vel = pos(0,0);
		this.flags = flags;
		this.path = path
		this.slice = 0;
		this.progress = 0;
	}

	tick() {

	}

	register() {
		state.register.physics.path.push(this);
	}
}

class DynamicPhysObj extends _PhysicsObject {
	constructor(hitbox, vel, flags) {
		super(hitbox, vel, flags);
		this.onFloor = false;
	}
	
	tick(dt) {
		if (this.gravity && !this.onFloor) {
			this.vel.y += 9.8*25*dt;
		}

		for (let j = 0; j < state.register.physics.static.length; j++) {
			let obj = state.register.physics.static[j];
			switch (this.hitbox.intersects(obj.hitbox)) {
				case COLLISION.FLOOR:
					console.log("Hit on floor");
					fill(255,0,0)
					this.onFloor = true;
					this.hitbox.y = obj.hitbox.y - this.hitbox.h;
					this.vel = {x:0, y:0};
				break;
				case COLLISION.LEFT:
					console.log("Hit on left");
					fill(0,0,255)
					this.hitbox.x = obj.hitbox.x - this.hitbox.w
					this.vel = {x:0, y:0};
				break;
				case COLLISION.RIGHT:
					console.log("Hit on right");
					this.hitbox.x = obj.hitbox.x - this.hitbox.w
					this.vel = {x:0, y:0};
				break;
				case COLLISION.OTHER:
					console.log("Hit on other");
					this.vel = {x:0, y:0};
				break;
				case COLLISION.NO_HIT:
				break;
			}
		}

		this.hitbox.x += this.vel.x * dt;
		this.hitbox.y += this.vel.y * dt;
	}
}