// Variables to store loaded fonts
var fMonoton;
var fIconicIonic;

// CRT shader
var crt;

async function setup() {
	createCanvas(480*1.5, 270*1.5);
	
	// Load shader file as a string
	crt = await loadStrings('../crt.frag');
	crt = crt.join('\n')
	// Create a shader from the code
	crt = createFilterShader(crt);

	// Load fonts
	fMonoton = await loadFont('/Assets/Fonts/Monoton.ttf');
	fIconicIonic = await loadFont('/Assets/Fonts/HffIconicIonic-102e.ttf');

	// See constants.js:42
	W = width/NATIVE_RESOLUTION.width;
	H = height/NATIVE_RESOLUTION.height;

	// Loop through screens until you find the current screen and call its setup function
	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen_id == scr.id) {
			scr.setup();
		}
	}
}

/**
 * Non drawing related code that runs every frame.
 */
function tick() {
	// Things to do when the game is running
	if (state.active) {
		// Tick every path object
		for (let id = 0; id < state.current_level.reg.length; id++) {
			let obj = state.current_level.reg[id];
			obj.tick(deltaTime);
		}

		// Run player's tick
		player_tick();

		// In the second phase change ghost speed to the correct speed for the frame
		// Theres a lot of stupid math that took me forever to figure out cuz im stupid and I
		// 		don't fully understand what's happening
		if (state.game.ghost !== null && state.game.stage === 1) {
			state.game.ghost.speed = (1000/deltaTime)/GHOST_FRAME_RATE;
		}
	} else {
		// Reset the current level if not active
		state.current_level = null;
	}

	// Add a variable to the shader for the time (used for animating the scan lines)
	crt.setUniform('time', time);
	// Add time since last frame to the time
	time += deltaTime / 1000;
}

function draw() {
	// Background is consistent across all screens
	background(220);

	// Run tick every frame
	tick();

	// Loop until current screen and run the draw and tick functions
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
	// I use `event.keyCde` instead of just `keyCode` because for some reason it removes
	//    the issues of multiple releases at the same time
	switch (event.keyCode) {
		case 65: case 37:	// A / ⟵
			state.game.left = true;
		break;
		case 68: case 39:	// D / ⟶
			state.game.right = true;
		break;
		case 87: case 38:	// W / ↑ 
			if (opts.debug.fly) {
				state.game.up = true;
			} else {
				look -= LOOK_DISTANCE;
			}
		break;
		case 83: case 40:	// S / ↓
			if (opts.debug.fly) {
				state.game.down = true;
			} else {
				look += LOOK_DISTANCE;
			}
		break;
		case 32:	// SPACE
			jumpTimer = JUMP_TIMER;
			jumpTimerActive = true;
			jumping = true;
		break;
		case 81:	// Q
			// If we're in the credits, have Q go back to the main menu
			if (state.screen_id === SCREEN_IDS.CREDITS) {
				change_screen(SCREEN_IDS.MAIN_MENU);
			// If we're in gameplay, swap phase (if instant swap is enabled)
			} else if (opts.debug.instant_time_swap && !justSwapped) {
				justSwapped = true;
				swap_phase.bind(state.current_level)();
			}
		break;
	}
}

function keyReleased(event) {
	// I use `event.keyCde` instead of just `keyCode` because for some reason it removes
	//		the issues of multiple releases at the same time
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