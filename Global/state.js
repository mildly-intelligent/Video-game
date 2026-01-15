// Startup function
// Noah D.
// 10-12-2025
// 10-12-2025
/*
	Code to run on the startup of the program
	Contains globally important variables such as `state`
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var state = {
	screen_id: SCREEN_IDS.GAME_ACTIVE,
	current_level: null,
	active: true,
	screens: [],
	levels: [],
	buf: null,
	game: {
		level: 0x1,
		stage: 0,
		ghost_path: [],
		ghost: null,
		left: false,
		right: false,
		up: false,
		down: false,
	},
}

/**
 * Either goes from the past to the present or the other way round.
 * Must be bound to a level.
 * @example
 * swap_phase.bind(lv5)();
 */
const swap_phase = function() {
	this.reg = [];
	if (state.game.stage === 0) {
		state.game.stage = 1;
		this.setupB();
		let _ = new Field(player.hitbox.x, player.hitbox.y, player.hitbox.w, player.hitbox.h);
		state.game.ghost = new PathPhysObj(_, state.game.ghost_path, (1000/deltaTime)/GHOST_FRAME_RATE).register(this.reg);
	} else if (state.game.stage === 1) {
		state.game.stage = 0;
		this.setupA();
	}
}

function change_screen(id) {
	state.screen_id = id;
	if (state.screen_id == SCREEN_IDS.GAME_ACTIVE) {
		state.active = true;
	} else {
		state.active = false;
	}
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
	x: 0,
	y: 0,
};