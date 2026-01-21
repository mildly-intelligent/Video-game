// Generic code for all levels
// Noah D.
// 01-12-26
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var screen06 = new Scr(0o06, setup_game, draw_game, null).register();

/** @type {DynamicPhysObj} */
var player = new DynamicPhysObj(new Field(0,0,50,50), {x:0,y:0}, !opts.debug.no_clip, !opts.debug.fly);

// Used to add a little bit of leeway if you're trying to jump immediately after hitting the ground
var jumpTimer = 0;
var jumpTimerActive = false;

var timeTillSwap = 0;
var justSwapped = false;

var starCollected = false;

var look = 0;

function setup_game() {
	player.hitbox.w = 25*W;
	player.hitbox.h = 25*H;
	cam.pos = {
		x: random(-500*W, 500*W),
		y: random(-500*H, 500*H),
	}
	state.current_level = state.levels.at(state.game.level);
	state.current_level.reg = [];
	player.vel = {x:0,y:0};
	state.game.ghost_path = [];
	state.current_level.setupA();
	starCollected = false;
	death_object(-10_000*W, 5_000*H, 20_000*W, 1000*H, state.current_level.reg);
 }

function draw_game() {
	if (!opts.debug.instant_time_swap) {
		if (!justSwapped && (keyIsDown('KeyQ'))) {
			timeTillSwap += deltaTime;
		}
		if (timeTillSwap >= TIME_SWAP_DELAY) {
			justSwapped = true;
			timeTillSwap = 0;
			swap_phase.bind(state.current_level)();
		}
	}

	fill(255)
	stroke(0)
	strokeWeight(1);
	push();
	
	// Move the camera towards the player for smoothing
	cam.target.x = player.pos.x;
	cam.target.y = player.pos.y + look;
	cam.pos.x = lerp(cam.pos.x, cam.target.x, CAMERA_DELAY);
	cam.pos.y = lerp(cam.pos.y, cam.target.y, CAMERA_DELAY);
	
	translate(width/2-cam.pos.x, height/2-cam.pos.y);
	
	background(220);

	
	if (opts.debug.grid_lines) {
		strokeWeight(1);
		stroke(200);
		for (let x = -2000*W; x <= 2000*W; x += 25) {
			line(x, -2000*W, x, 2000*W);
		}
		for (let y = -2000*H; y <= 2000*H; y += 25) {
			line(-2000*H, y, 2000*H, y)
		}
		stroke(0);
	}

	state.game.stage === 0 ? fill('magenta') : fill('blue');
	rect(player.pos.x, player.pos.y, player.hitbox.w, player.hitbox.h)
	fill('white');
	stroke('#12b72e88');
	strokeWeight(10);
	noFill();
	if (!opts.debug.instant_time_swap) arc(
		player.hitbox.center.x, player.hitbox.center.y,
		1.75*player.hitbox.w, 1.75*player.hitbox.h,
		0, timeTillSwap*TAU/TIME_SWAP_DELAY,
		OPEN,
	);
	fill(255);
	stroke(0);
	strokeWeight(1);
	
	if (state.active) {
		for (let id = 0; id < state.current_level.reg.length; id++) {
			let obj = state.current_level.reg[id];
			if (obj.draw) {
				obj.draw_func();
			}
		}
		
		if (state.game.stage === 0) {
			state.current_level.drawA();
		} else if (state.game.stage === 1) {
			state.current_level.drawB();
		}
	}
	
	pop();

	// if (state.game.stage === 0 && opts.video.crt) {
	// 	filter(crt);
	// }
}

var jumping = false;
function player_tick() {
	if (jumpTimerActive) {
		if (jumpTimer >= 0) {
			jumpTimer -= deltaTime;
		} else {
			jumpTimer = 0;
			jumpTimerActive = false;
		}
	}

	if ((player.onFloor || player.onPath) && jumpTimer > 0) {
		player.vel.y += -JUMP_STRENGTH;
		jumpTimer = 0;
		jumpTimerActive = false;
		player.onPath = false;
	}

	if (state.game.left && state.game.right) {
		// If both directions are pressed we don't want the character to move
		if (player.onFloor) {
			player.vel.x *= FRICTION;
		} else {
			player.vel.x *= AIR_RESISTANCE;
		}
	} else if (state.game.left) {
		// Accelerate the character left
		player.vel.x -= PLAYER_ACC;
	} else if (state.game.right) {	
		// Accelerate the character right
		player.vel.x += PLAYER_ACC;
	} else if (player.onFloor) {
		// If the player isn't pressing buttons and is on the floor apply friction
		player.vel.x *= FRICTION;
	} else {
		// If the character isn't pressing buttons and is in the air, apply less friction
		player.vel.x *= AIR_RESISTANCE;
	}

	if (opts.debug.fly) {
		if (state.game.down && state.game.up) {
			player.vel.y *= AIR_RESISTANCE;
		} else if (state.game.down) {
			player.vel.y += PLAYER_ACC;
		} else if (state.game.up) {	
			player.vel.y -= PLAYER_ACC;
		} else {
			player.vel.y *= AIR_RESISTANCE;
		}
	}

	player.vel.x = min(max(player.vel.x, -PLAYER_MAX_SPEED), PLAYER_MAX_SPEED);
	player.vel.y = min(max(player.vel.y, -PLAYER_MAX_SPEED), PLAYER_MAX_SPEED);

	player.tick(deltaTime);
	jumping = false;

	if ((frameCount % GHOST_FRAME_RATE == 0) && state.game.stage === 0) {
		state.game.ghost_path.push(player.pos);
	}
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