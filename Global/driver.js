// Driver code
// Noah D.
// 10-12-2025
/*
	Script that handles transitioning between screens
*/
/// <reference path="/home/mildly-intelligent/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var fMonoton;
var fIconicIonic;

var canvas;

async function setup() {
	canvas = createCanvas(480*1.5, 270*1.5);

	// See constants.js:42
	W = width/NATIVE_RESOLUTION.width;
	H = height/NATIVE_RESOLUTION.height;

	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen_id == scr.id) {
			scr.setup();
		}
	}

	
	// fMonoton = await loadFont('/Assets/Fonts/Monoton.ttf');
	// fIconicIonic = await loadFont('/Assets/Fonts/HffIconicIonic-102e.ttf');
}

/**
 * Credit to https://stackoverflow.com/a/70231652/22890720
 * 
 * Copies the current screen into a copyable buffer for later use.
 * @returns {import("../../../../.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types").Graphics}
 * @example
 * let buf = screenshot();
 * 
 * // -- snip --
 * 
 * copy(
 * 	buf,
 * 	0,0, buf.width,buf.height,
 * 	0,0, width,height,
 * );
 */
function screenshot() {
	let buffer = createGraphics(width, height);
	buffer.copy(
		canvas,
		0,0, width,height,
		0,0, buffer.width,buffer.height,
	);

	return buffer;
}

function tick() {
	if (state.active) {
		for (let id = 0; id < state.current_level.reg.length; id++) {
			let obj = state.current_level.reg[id];
			obj.tick(deltaTime);
		}

		player_tick();

		if (state.game.ghost !== null && state.game.stage === 1) {
			state.game.ghost.speed = (1000/deltaTime)/GHOST_FRAME_RATE;
		}
	} else {
		state.current_level = null;
	}

	time += deltaTime / 1000;
}

function draw() {
	tick();

	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen_id == scr.id) {
			scr.draw();
			scr.tick();
		}
	}
}