// Screen and level class
// 2025-12-16
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />



class Scr {
	#setup;
	#draw;
	#tick;
	
	constructor(id, setup, draw, tick) {
		this.id = id;
		this.#setup = setup ?? (() => {});
		this.#draw = draw ?? (() => {});
		this.#tick = tick ?? (() => {});
	}

	setup() {
		this.#setup();
	}

	draw() {
		this.#draw();
		this.tick();
	}

	tick() {
		this.#tick();
	}

	register() {
		state.screens.push(this);
		return this;
	}
}

class Level {
	#setupA;
	#setupB;
	#drawA;
	#drawB;

	/**
	 * @param {number} id 
	 * @param {() => void} setupA 
	 * @param {() => void} setupB 
	 * @param {() => void} drawA 
	 * @param {() => void} drawB 
	 * @param {string} name 
	 * @constructor
	 */
	constructor(
		id,
		setupA, setupB,
		drawA, drawB,
		name,
	) {
		this.id = id;
		this.#setupA = setupA;
		this.#setupB = setupB;
		this.#drawA = drawA;
		this.#drawB = drawB;
		this.name = name;
		this.status = 0b000;
		this.reg = [];
	}

	setupA() {
		this.#setupA();
	}

	setupB() {
		this.#setupB();
	}

	drawA() {
		this.#drawA();
	}

	drawB() {
		this.#drawB();
	}

	register() {
		state.levels.push(this);
		return this;
	}

	get unlocked() { return this.status & LEVEL_STATUS.UNLOCKED; }
	
	get completed() { return this.status & LEVEL_STATUS.COMPLETED; }

	get starred() { return this.status & LEVEL_STATUS.STARRED; }
}