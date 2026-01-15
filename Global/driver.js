// Driver code
// Noah D.
// 10-12-2025
/*
	Script that handles transitioning between screens
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var fMonoton;
var fIconicIonic;
async function setup() {
	createCanvas(480*2, 270*2);

	// See constants.js:42
	W = width/NATIVE_RESOLUTION.width;
	H = height/NATIVE_RESOLUTION.height;

	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen_id == scr.id) {
			scr.setup();
		}
	}

	if (state.active) {
		for (let id = 0; id < state.levels.length; id++) {
			let lv = state.levels[id];
			if (state.game.level == lv.id) {
				lv.setupA();
			}
		}
	}

	
	fMonoton = await loadFont('/Assets/Fonts/Monoton.ttf');
	fIconicIonic = await loadFont('/Assets/Fonts/HffIconicIonic-102e.ttf');
}

function tick() {
	if (state.active) {
		for (let id = 0; id < state.current_level.reg.length; id++) {
			let obj = state.current_level.reg[id];
			obj.tick(deltaTime);
		}

		player_tick();
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