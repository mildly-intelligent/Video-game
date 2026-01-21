// Startup function
// Noah D.
// 10-12-2025
// 10-12-2025
/*
	Code to run on the startup of the program
	Contains globally important variables such as `state`
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

/**
 * @type {{
 * 	screen_id: number,
 * 	current_level: Level?,
 * 	active: Booleanean,
 * 	screens: Screen[],
 * 	levels: Level[],
 * 	game: {
 * 		level: number,
 * 		stage: number,
 * 		star_collected: Booleanean,
 * 		ghost_path: {x:number, y:number}[],
 * 		ghost: PathPhysObj?,
 * 		left: Booleanean,
 * 		right: Booleanean,
 * 		up: Booleanean,
 * 		down: Booleanean,
 * 	},
 * }}
 */
var state = {
	screen_id: SCREEN_IDS.MAIN_MENU,
	current_level: null,
	active: false,
	screens: [],
	levels: [],
	game: {
		level: 0,
		stage: 0,	// 0 for past, 1 for present
		star_collected: false,	// Wether the star has been collected in the current run of a level
		ghost_path: [],
		ghost: null,
		left: false,	// If the direction is being held
		right: false,	// If the direction is being held
		up: false,		// If the direction is being held
		down: false,	// If the direction is being held
	},
};

/**
 * Either goes from the past to the present or the other way round.
 * Must be bound to a level.
 * @example
 * swap_phase.bind(lv5)();
 */
const swap_phase = function() {
	this.reg = [];
	// Set camera to a random starting position for a interesting startup animation
	cam.pos = {
		x: random(-500*W, 500*W),
		y: random(-500*H, 500*H),
	}
	if (state.game.stage === 0) {
		state.game.stage = 1;
		this.setupB();
		// Create the ghost
		let _ = new Field(player.hitbox.x-10*W, player.hitbox.y, player.hitbox.w+20*W, player.hitbox.h);
		state.game.ghost = new PathPhysObj(_, state.game.ghost_path, (1000/deltaTime)/GHOST_FRAME_RATE, false, true, true).register(this.reg);
	} else if (state.game.stage === 1) {
		state.game.ghost_path = [];
		state.game.stage = 0;
		this.setupA();
	}
}

/**
 * Changes to a given screen
 * @param {number} id Id to change to
 */
function change_screen(id) {
	state.screen_id = id;
	// Make sure `state.active` is never true when the screen isn't `GAME_ACTIVE`
	if (state.screen_id == SCREEN_IDS.GAME_ACTIVE) {
		state.game.star_collected = false;
		state.active = true;
	} else {
		state.active = false;
	}
	// Call appropriate setup function
	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen_id == scr.id) {
			scr.setup();
		}
	}
}


// Used globally to remap coordinates to be consistent across screen sizes
var W;
var H;

// Similar to `frameCount` but keeps track of seconds, not frames
var time = 0.0;

// Camera position
var cam = {
	pos: {x: 0, y: 0},		// Current position of the camera
	target: {x: 0, y: 0},	// Where the camera is trying to go (often equal to `player.pos`)
};