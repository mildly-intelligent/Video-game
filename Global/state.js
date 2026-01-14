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
	game: {
		level: 0x0,
		stage: 0,
		left: false,
		right: false,
	},
}

const swap_phase = function() {
	this.reg = [];
	if (state.game.stage === 0) {
		state.game.stage = 1;
		this.setupB();
	} else if (state.game.stage === 1) {
		state.game.stage = 0;
		this.setupA();
	}
}

function change_screen(id) {
	state.screen_id = id;
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