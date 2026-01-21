// Screen and level class
// Noah D.
// 2025-12-16
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />


/**
 * Class for non-game screens
 * @class
 */
class Scr {
	/** Setup function
	 * @protected @type {() => void} */
	#setup;
	/** Drawing function
	 * @protected @type {() => void} */
	#draw;
	/** Ticking function
	 * @protected @type {() => void} */
	#tick;
	
	/**
	 * @param {number} id Screen ID {@link SCREEN_IDS}
	 * @param {() => {}} setup Function to call on setup
	 * @param {() => {}} draw Function to call on draw
	 * @param {() => {}} tick Function to call on tick
	 * @constructor
	 */
	constructor(id, setup, draw, tick) {
		this.id = id;
		// Null coalescing operator used for defaults
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

	/**
	 * Adds the screen to `state.screens`
	 * @returns {Scr} Same screen
	 * @chainable
	 */
	register() {
		state.screens.push(this);
		return this;
	}
}

/**
 * Class for game levels
 * @class
 */
class Level {
	/** Setup function for past
	 * @protected @type {() => void} */
	#setupA;
	/** Setup function for present
	 * @protected @type {() => void} */
	#setupB;
	/** Draw function for past
	 * @protected @type {() => void} */
	#drawA;
	/** Draw function for present
	 * @protected @type {() => void} */
	#drawB;

	/**
	 * @param {number} id Level ID
	 * @param {() => void} setupA Setup function for the past
	 * @param {() => void} setupB Setup function for the present
	 * @param {() => void} drawA Draw function for the past
	 * @param {() => void} drawB Draw function for the present
	 * @param {string} name Name of the level (for level-select menu)
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
		/** 
		 * Bit string of status {@link LEVEL_STATUS}
		 * @type {number} 
		 */
		this.status = 0b000;
		/** Register of objects in level
		 * @type {_NonDynamicPhysObj[]} */
		this.reg = [];
	}

	setupA() {
		this.reg = [];
		state.game.stage = 0;
		this.#setupA();
	}

	setupB() {
		this.reg = [];
		state.game.stage = 1;
		this.#setupB();
	}

	drawA() {
		this.#drawA();
	}

	drawB() {
		this.#drawB();
	}

	/**
	 * Adds level to `state.levels`
	 * @returns {Level} Same level
	 * @chainable
	 */
	register() {
		state.levels.push(this);
		return this;
	}

	/* === Extract Level Status === */
	get unlocked() { return this.status & LEVEL_STATUS.UNLOCKED; }
	
	get completed() { return this.status & LEVEL_STATUS.COMPLETED; }

	get starred() { return this.status & LEVEL_STATUS.STARRED; }
}