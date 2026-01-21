// Physics handling
// Noah D.
// 11-12-2025
/*

*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

/**
 * Class for storing 2d points
 * @deprecated Use `{x: number, y: number}` instead
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
	 * @returns {Boolean} If the point is in field, return true
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

/**
 * Class to store a region
 */
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
	 * The center of the field
	 * @type {{x:number, y:number}}
	 */
	get center() {
		return {
			x: this.x + this.w/2,
			y: this.y + this.h/2,
		};
	}

	/**
	 * Checks if two fields intersect
	 * 
	 * NOTE:
	 * ```
	 * f1.intersects(f2, ...) == f2.intersects(f1, ...)
	 * ```
	 * @param {Field} f Other field to check
	 * @param {Object} offset Offset position before calculation
	 * @param {number} offset.x Amount to offset x
	 * @param {number} offset.y Amount to offset y
	 * @returns {Boolean} If there was a collision
	 
	 */
	intersects(f, offset= {x:0,y:0}) {
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
 * Base class for all physics objects
 * @class
 */
class _PhysicsObject {
	/**
	 * @param {Field} hitbox Hitbox of the object
	 * @param {Boolean} do_collide Check for collisions?
	 * @param {Boolean} draw Draw the boundaries of the object?
	 * @constructor
	 */
	constructor(hitbox, do_collide, draw) {
		this.hitbox = hitbox;
		this.do_collide = do_collide;
		this.draw = draw;
	}

	/**
	 * Position of the object
	 * @type {{x: number, y: number}}
	 */
	get pos() {
		return this.hitbox.origin;
	}
	set pos(v) {
		this.hitbox.origin = v;
	}

	/**
	 * Called every frame
	 * @param {number} dt Time since last frame (ms)
	 * @override
	 */
	tick(dt) {

	}
}

/**
 * Base class for all objects that do not move because of velocity
 * @class
 * @extends _PhysicsObject
 */
class _NonDynamicPhysObj extends _PhysicsObject {
	/** 
	 * Function to call when drawing
	 * @type {() => void}
	 * @protected
	 * @property
	 */
	#draw_func;
	
	/**
	 * @param {Field} hitbox
	 * @param {Boolean} do_collide Default: `true`
	 * @param {Boolean} draw Default: `true`
	 * @param {() => void} on_hit Function to call if the object is hit. Default: `() => {}`
	 * @param {() => void} draw_func Function to call when drawing.
	 * @param {Boolean} pass_through_bottom If true objects can pass through the bottom of the object. Default: `false`
	 * @constructor
	 */
	constructor(hitbox, do_collide= true, draw= true, on_hit= () => {}, draw_func, pass_through_bottom= false) {
		super(hitbox, do_collide, draw);
		/**
		 * Small layer on top of the object for aid in collisions
		 * @property
		 */
		this.top = new Field(
			this.hitbox.x+5*W, this.hitbox.y,
			this.hitbox.w-10*W, 10 * H,
		);
		this.on_hit = on_hit;
		this.hit = false;
		// I use a protected variable to have a default value.
		this.#draw_func = draw_func;
		this.pass_through_bottom = pass_through_bottom;
	}

	/**
	 * Draw the object
	 */
	draw_func() {
		this.#draw_func = this.#draw_func ?? function() {
			rect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h)
		}
		this.#draw_func();
	}

	/**
	 * Append this object to a register
	 * @param {_NonDynamicPhysObj[]} reg Register to add to
	 * @returns {_NonDynamicPhysObj} The same object
	 * @chainable
	 */
	register(reg) {
		reg.push(this);
		return this;
	}
}

/**
 * Non moving object
 * @class
 * @extends _NonDynamicPhysObj
 */
class StaticPhysObj extends _NonDynamicPhysObj {
	/**
	 * @param {Field} hitbox
	 * @param {Boolean} do_collide Default: `true`
	 * @param {Boolean} draw Default: `true`
	 * @param {() => void} on_hit Function to call if the object is hit. Default: `() => {}`
	 * @param {() => void} draw_func Function to call when drawing.
	 * @param {Boolean} pass_through_bottom If true objects can pass through the bottom of the object. Default: `false`
	 * @constructor
	 */
	constructor(hitbox, do_collide= true, draw= true, on_hit= () => {}, draw_func, pass_through_bottom= false) {
		super(hitbox, do_collide, draw, on_hit, draw_func, pass_through_bottom);
	}
}

/**
 * Object that follows a set path
 * @class
 * @extends _NonDynamicPhysObj
 */
class PathPhysObj extends _NonDynamicPhysObj {
	/**
	 * @param {Field} hitbox
	 * @param {{x:number,y:number}[]} path Path to follow
	 * @param {number} speed Speed to move at
	 * @param {Boolean} loop Weather the object should turn around after reaching the end or stay still
	 * @param {Boolean} do_collide
	 * @param {Boolean} draw
	 * @param {() => void} on_hit
	 * @param {() => void} draw_func
	 * @param {Boolean} pass_through_bottom
	 */
	constructor(hitbox, path, speed, loop= true, do_collide= true, draw= true, on_hit= () => {}, draw_func, pass_through_bottom) {
		super(hitbox, do_collide, draw, on_hit, draw_func, pass_through_bottom);
		this.path = path;
		this.progress = 0;
		this.speed = speed;
		this.do_loop = loop;

		// 0: Forwards
		// 1: Backwards
		// 2: Stopped
		this.movement_type = 0;
	}

	/** Index in `this.path` that the path is currently looping through
	 * @type {number} */
	get slice() {
		return int(this.progress);
	}

	/** Progress within the current slice
	 * @type {number} */
	get progressInSlice() {
		return fract(this.progress);
	}

	/** Calculated velocity of the object
	 * @type {{x: number, y:number}} */
	get vel() {
		// If stopped return zero (weird things happen without this because the player on top of the path still thinks it's moving)
		if (this.movement_type === 2) {
			return {x:0, y:0};
		}

		// Define the start and end of the slice
		let sliceStart = this.path[this.slice];
		let sliceEnd = this.path[this.slice + 1];

		// I just realized an issue with this but everything still works so I don't care enough to fix it
		let x = lerp(sliceStart.x, sliceEnd.x, 0.01) - sliceStart.x;
		let y = lerp(sliceStart.y, sliceEnd.y, 0.01) - sliceStart.y;
		
		x *= this.speed * 10;
		y *= this.speed * 10;

		// Invert the velocity if moving backwards
		x *= this.movement_type == 1 ? -1 : 1;
		y *= this.movement_type == 1 ? -1 : 1;

		return {x:x, y:y};
	}

	tick(dt) {
		switch (this.movement_type) {
			// If moving forwards, add to the progress
			case 0:
				this.progress += this.speed * dt/1000;
			break;
			// If moving backwards, subtract to the progress
			case 1:
				this.progress -= this.speed * dt/1000;
			break;
			// If stopped, do nothing (included for completeness)
			case 2:
				void(0)
			break;
		}
		// If exceeding the length of the path, turn around or stop (depending on `this.loop`)
		if (this.progress > this.path.length-1) {
			if (this.do_loop) this.movement_type = 1;
			else this.movement_type = 2;

			// 0.0001 is there because of some DBZ errors
			this.progress = this.slice - 0.0001;
		// If below zero turn around
		} else if (this.progress < 0) {
			this.movement_type = 0;
			// 0.0001 is there because of some DBZ errors
			this.progress = 0.0001;
		}

		// Set endpoints
		let sliceStart = this.path[this.slice];
		let sliceEnd = this.path[this.slice + 1];

		// Get the point between the endpoints
		let pos = {
			x: lerp(sliceStart.x, sliceEnd.x, this.progressInSlice),
			y: lerp(sliceStart.y, sliceEnd.y, this.progressInSlice),
		};

		// Set the position
		this.hitbox.origin = pos;
		this.top.origin = pos;
	}
}

/**
 * Object that moves by velocity
 * @class
 * @extends _PhysicsObject
 */
class DynamicPhysObj extends _PhysicsObject {
	/**
	 * @param {Field} hitbox
	 * @param {{x: number, y: number}} vel Starting velocity
	 * @param {Boolean} do_collide
	 * @param {Boolean} do_gravity Weather to apply gravity
	 * @constructor
	 */
	constructor(hitbox, vel, do_collide, do_gravity) {
		super(hitbox, do_collide, true);
		this.vel = vel
		this.onFloor = false;
		this.onPath = false;
		this.do_gravity = do_gravity;

		/**
		 * If the player is on top of a path, set this to the path they are on
		 * @type {PathPhysObj}
		 * @property
		 */
		this.theThingThatItsOnTopOf = null;
	}

	/**
	 * Check for collisions and adjust position accordingly
	 * @protected
	 */
	#check_collision() {
		// Checked at the end
		let onFloor = false;
		let onPath = false;

		// Loop through objects
		for (let j = 0; j < state.current_level.reg.length; j++) {
			/** Current object working on
			 * @type {_NonDynamicPhysObj} */
			let obj = state.current_level.reg[j];

			// Check if there are collisions
			let collision = this.hitbox.intersects(obj.hitbox);
			let top_collision = this.hitbox.intersects(obj.top);

			// If the player is moving upwards and the object we're checking can be passed through on the bottom then we don't care
			if (obj.pass_through_bottom && this.vel.y <= 0) {
				continue;
			}

			// If collisions are off and the object has an on_hit function check for that
			if (!obj.do_collide && obj.on_hit !== null) {
				// This chunk of code is hard to describe line-by-line so I'll explain the whole thing.
				// The code sets a variable to true if the object is inside and false if not, the code
				//		uses this variable when the object is inside, it runs the `.on_hit` method
				//		before setting `obj.hit` to true meaning there is one frame, right when the
				//		object is first hit.
				if (collision) {
					if (!obj.hit) {
						obj.on_hit()
					}
					obj.hit = true;
				} else {
					obj.hit = false;
				}
				
				// If the object we're checking is not set to have collisions we can ignore it
				//	To do so I simply skip the calculations and move to the next physics object
				continue;
			}

			
			// Check if the object falls onto an object
			if (top_collision) {
				this.vel.y = 0;
				onFloor = true
				if (obj.constructor.name == 'PathPhysObj') {
					this.theThingThatItsOnTopOf = obj;
					onPath = true;
				}
				this.hitbox.y = obj.top.y - this.hitbox.h;
				break;
			// Check slightly below to make sure it's still above something
			} else if (this.hitbox.intersects(obj.top, {x:0,y:1})) {
				// Variable to keep track of if the object is on top of *any* other object
				onFloor = true;
				if (obj.constructor.name == 'PathPhysObj') {
					this.theThingThatItsOnTopOf = obj;
					onPath = true;
				}
			}
			// Side and bottom collisions
			if (collision) {
				if (obj.pass_through_bottom && this.vel.y < 0) {
					this.hitbox.y = obj.top.y - this.hitbox.h;
					this.vel.y = 0;

					break;
				}

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

		if (onPath) {
			this.onPath = true;
		} else {
			this.onPath = false;
			this.theThingThatItsOnTopOf = null;
		}
	}
	
	tick(dt) {
		if (this.do_gravity && !this.onFloor && !this.onPath) {
			// Applies a smaller amount of acceleration if you are falling than if you are rising
			if (this.vel.y < 0) {
				this.vel.y += GRAVITY_UP*dt/1000;
			} else {
				this.vel.y += GRAVITY_DOWN*dt/1000;
			}
		}

		// If we're on a path set our y to the path's y
		if (this.onPath) {
			this.hitbox.y = this.theThingThatItsOnTopOf.hitbox.y - this.hitbox.h;
		}
		
		// Check for collisions, we can skip this if the player's collisions are turned off
		if (this.do_collide) {
			this.#check_collision()
		};

		// If we're jumping we are no longer on the path
		this.onPath &&= !jumping;

		// Match the x velocity of something we're on top of
		if (this.theThingThatItsOnTopOf !== null) {
			this.vel.x += this.theThingThatItsOnTopOf.vel.x;
			// this.vel.y += this.theThingThatItsOnTopOf.vel.y;
		}

		// Add velocity to the position
		this.hitbox.x += this.vel.x * 10*dt/1000;
		if (!this.onPath) {
			this.hitbox.y += this.vel.y * 10*dt/1000;
		}

		// I don't remember why this is here but I'm scared to touch it
		if (this.theThingThatItsOnTopOf !== null) {
			this.vel.x -= this.theThingThatItsOnTopOf.vel.x;
			// this.vel.y -= this.theThingThatItsOnTopOf.vel.y;
		}
	}
}

/* === Aliases === */
/**
 * Creates a new `StaticPhysObj` with collisions and draws and registers it.
 * This is a simple object and you should call `StaticPhysObj.constructor`
 * 		manually if you want more advanced functionality.
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {_NonDynamicPhysObj[]} reg Register to add the object to
 * @param {Boolean?} draw Weather to draw the hitbox
 * @returns {StaticPhysObj} The platform
 */
function platform(x, y, w, h, reg, draw= true) {
	return new StaticPhysObj(
		new Field(x,y,w,h),
		true, draw,
		undefined
	).register(reg);
}
/**
 * Creates a new `StaticPhysObj` that can be passed through
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {_NonDynamicPhysObj[]} reg Register to add the object to
 * @param {Boolean?} draw Weather to draw the hitbox
 * @returns {StaticPhysObj} The platform
 */
function one_way_platform(x, y, w, reg, draw= true) {
	let h = 10*H;
	return new StaticPhysObj(
		new Field(x, y, w, h),
		true, draw,
		undefined,
		function() {
			strokeWeight(5);
			line(x,y, x,y+h);
			line(x,y, x+w,y);
			line(x+w,y, x+w,y+h);
			strokeWeight(1);
		},
		true
	).register(reg);
}

/**
 * Creates a object that kills you.
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 * @param {_NonDynamicPhysObj[]} reg Register to add the object to
 * @param {Boolean?} draw Weather to draw the hitbox
 * @returns {StaticPhysObj} The death object
 */
function death_object(x, y, w, h, reg, draw= true) {
	return new StaticPhysObj(
		new Field(x,y,w,h),
		false, draw,
		() => {
			if (!opts.debug.god) change_screen(SCREEN_IDS.FAIL);
		},
		function() {
			fill('red');
			rect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h)
			fill('white');
		}
	).register(reg);
}