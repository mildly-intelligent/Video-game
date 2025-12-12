// Physics handling
// Noah D.
// 11-12-2025
// 11-12-2025
/*

*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

class Point {
	constructor(v1, v2) {
		this.x = v1;
		this.y = v2;
	}

	/**
	 * 
	 * @param {Point} other 
	 */
	add(other) {
		return new Point(this.x+other.x, this.y+other.y);
	}

	/**
	 * 
	 * @param {Field} f 
	 * @returns {bool} 
	 */
	inField(f) {
		return (f.x <= this.x && this.x <= f.x+f.w) && (f.y <= this.y && this.y <= f.y+f.h);
	}
}

class Field {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	get origin() {
		return new Point(this.x, this.y);
	}

	intersects(f) {
		let l1 = this.origin;
		let r1 = new Point(this.x+this.w, this.y+this.h);
		let l2 = f.origin;
		let r2 = new Point(f.x+f.w, f.y+f.h);
		// https://stackoverflow.com/a/306332/22890720
		if (l1.x > r2.x || l2.x > r1.x || r1.y < l2.y || r2.y < l1.y) {
			// console.log(l1.x > r2.x, l2.x > r1.x, r1.y > l2.y, r2.y > l1.y);
			return false;
		} else {
			return true;
		}
	}
}

class _RaycastReturnValue {
	/**
	 * 
	 * @param {bool} hit 
	 * @param {number} distance 
	 * @param {Point} landing 
	 */
	constructor(hit, distance, landing) {
		this.hit = hit;
		this.distance = distance;
		this.landing = landing;
	}
}

/**
 * 
 * @param {Point} origin 
 * @param {Point} direction 
 * @param {number} length 
 * @returns {_RaycastReturnValue} 
 */
function raycast(origin, direction, length= (sqrt(width**2 + height**2))) {
	let pos = new Point(origin.x, origin.y);
	let dist = (p) => sqrt((p.x-origin.x)**2+(p.y-origin.y)**2);
	while (dist(pos) < length) {
		point(pos.x, pos.y);

		pos.x += direction.x;
		pos.y += direction.y;
	}
}