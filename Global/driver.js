// Driver code
// Noah D.
// 10-12-2025
/*
	Script that handles transitioning between screens
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var fMonoton;
var fIconicIonic;

var crt;
async function setup() {
	createCanvas(480*1.5, 270*1.5);
	crt = await loadStrings('../crt.frag');
	crt = crt.join('\n')
	crt = createFilterShader(crt);

	// See constants.js:42
	W = width/NATIVE_RESOLUTION.width;
	H = height/NATIVE_RESOLUTION.height;

	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen_id == scr.id) {
			scr.setup();
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

		if (state.game.ghost !== null && state.game.stage === 1) {
			state.game.ghost.speed = (1000/deltaTime)/GHOST_FRAME_RATE;
		}
	} else {
		state.current_level = null;
	}

	time += deltaTime / 1000;
}

function draw() {
	// background('#f0f');

	tick();

	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen_id == scr.id) {
			scr.draw();
			scr.tick();
		}
	}
}