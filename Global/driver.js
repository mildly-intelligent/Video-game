// Driver code
// Noah D.
// 10-12-2025
/*
	Script that handles transitioning between screens
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

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
	background(220);

	tick();

	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen_id == scr.id) {
			scr.draw();
			scr.tick();
		}
	}
	
	style_text(null, ITALIC, 10, color(50), LEFT, BOTTOM);
	text(__VERSION__, 0, 0, width/2, height);
}


function keyPressed(event) {
	// Bit-wise OR operation for the mask so the bit we want is set to 1
	switch (event.keyCode) {
		case 65: case 37:
			state.game.left = true;
		break;
		case 68: case 39:
			state.game.right = true;
		break;
		case 87: case 38:
			if (opts.debug.fly) {
				state.game.up = true;
			} else {
				look -= LOOK_DISTANCE;
			}
		break;
		case 83: case 40:
			if (opts.debug.fly) {
				state.game.down = true;
			} else {
				look += LOOK_DISTANCE;
			}
		break;
		case 32:
			jumpTimer = JUMP_TIMER;
			jumpTimerActive = true;
			jumping = true;
		break;
		case 81:
			if (state.screen_id === SCREEN_IDS.CREDITS) {
				change_screen(SCREEN_IDS.MAIN_MENU);
			}
			if (opts.debug.instant_time_swap && !justSwapped) {
				justSwapped = true;
				swap_phase.bind(state.current_level)();
			}
		break;
	}
}

function keyReleased(event) {
	// Bit-wise AND operation for the inverse of the mask so the bit we want is set to 0
	// I use `event.keyCde` instead of just `keyCode` because for some reason it removes
	//    the issues of multiple releases at the same time
	switch (event.keyCode) {
		case 65: case 37:
			state.game.left = false;
		break;
		case 68: case 39:
			state.game.right = false;
		break;
		case 87: case 38:
			state.game.up = false;
			look = 0;
		break;
		case 83: case 40:
			state.game.down = false;
			look = 0;
		break;
		case 81:
			timeTillSwap = 0;
			justSwapped = false;
		break;
	}
}