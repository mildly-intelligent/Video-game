var screen06 = new Scr(0o06, setup_game, draw_game, null).register();

// Initialize player object
/** @type {DynamicPhysObj} */
var player = new DynamicPhysObj(new Field(0,0,50,50), {x:0,y:0}, !opts.debug.no_clip, !opts.debug.fly);

// Used to add a little bit of leeway if you're trying to jump immediately after hitting the ground
var jumpTimer = 0;
var jumpTimerActive = false;

var timeTillSwap = 0;
var justSwapped = false;

var starCollected = false;

/** Offset for camera, used if looking up or down */
var look = 0;

function setup_game() {
	player.hitbox.w = 25*W;
	player.hitbox.h = 25*H;
	cam.pos = {
		x: random(-500*W, 500*W),
		y: random(-500*H, 500*H),
	}
	// On startup set `state.current_level` to the right level
	state.current_level = state.levels.at(state.game.level);
	// Clear register
	state.current_level.reg = [];
	player.vel = {x:0,y:0};
	state.game.ghost_path = [];
	state.current_level.setupA();
	starCollected = false;
	// Kill the player if they fall too much
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

	// Set camera target point
	cam.target.x = player.pos.x;
	cam.target.y = player.pos.y + look;
	// Move the camera towards the player for smoothing
	cam.pos.x = lerp(cam.pos.x, cam.target.x, CAMERA_DELAY);
	cam.pos.y = lerp(cam.pos.y, cam.target.y, CAMERA_DELAY);
	
	
	translate(width/2, height/2);

	if (opts.video.bg) {
		// This looks complicated but it really just draws a bunch of lines
		push();
		stroke(185);
		translate(-cam.pos.x, -cam.pos.y);
		for (let x = -2000*W; x <= 2000*W; x += 25) {
			line(x, -2000*W, x, 2000*W);
		}
		for (let y = -2000*H; y <= 2000*H; y += 25) {
			line(-2000*H, y, 2000*H, y)
		}
		pop();
		
		push();
		stroke(200);
		translate(-cam.pos.x*0.5, -cam.pos.y*0.5+1);
		for (let x = -2000*W; x <= 2000*W; x += 25) {
			line(x, -2000*W, x, 2000*W);
		}
		for (let y = -2000*H; y <= 2000*H; y += 25) {
			line(-2000*H, y, 2000*H, y)
		}
		pop();
	}
	
	// Move everything the opposite direction from the camera (from the camera's perspective this looks like things moving the right way)
	translate(-cam.pos.x, -cam.pos.y);
	
	// Set player color (pink if past, blue if future)
	state.game.stage === 0 ? fill('magenta') : fill('blue');
	rect(player.pos.x, player.pos.y, player.hitbox.w, player.hitbox.h)
	fill('white');
	stroke('#12b72e88');
	strokeWeight(10);
	noFill();
	// Draw timer for swapping
	if (!opts.debug.instant_time_swap) arc(
		player.hitbox.center.x, player.hitbox.center.y,
		1.75*player.hitbox.w, 1.75*player.hitbox.h,
		0, timeTillSwap*TAU/TIME_SWAP_DELAY,
		OPEN,
	);
	fill(255);
	stroke(0);
	strokeWeight(1);
	
	// Wrapped in `if (state.active)` because things break otherwise
	if (state.active) {
		// Draw all of the objects
		for (let id = 0; id < state.current_level.reg.length; id++) {
			let obj = state.current_level.reg[id];
			if (obj.draw) obj.draw_func();
		}
		
		// Draw any additional layers of the level (star, text, etc.)
		if (state.game.stage === 0) {
			state.current_level.drawA();
		} else if (state.game.stage === 1) {
			state.current_level.drawB();
		}
	}
	
	pop();

	// Apply CRT filter if in the past
	if (state.game.stage === 0 && opts.video.crt) {
		filter(crt);
	}
}

var jumping = false;
function player_tick() {
	// I don't even know I'm really confused myself at all of this, I tried to add leeway to
	// 		the jump and it didn't work and somehow this happened and im very lost
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

	// Clamp the player's velocity to the max speed
	player.vel.x = min(max(player.vel.x, -PLAYER_MAX_SPEED), PLAYER_MAX_SPEED);
	player.vel.y = min(max(player.vel.y, -PLAYER_MAX_SPEED), PLAYER_MAX_SPEED);

	// Tick the player
	player.tick(deltaTime);
	// `jumping` should only ever be true for one frame
	jumping = false;

	// The `%` operator takes the remainder of x ÷ y
	// Used here to see if the remainder of the current frame and the framerate of the ghost is zero
	// That would mean that the current frame is a multiple of `GHOST_FRAME_RATE`
	// What this does is append the ghost path every `GHOST_FRAME_RATE` frames
	if ((frameCount % GHOST_FRAME_RATE == 0) && state.game.stage === 0) {
		state.game.ghost_path.push(player.pos);
	}
}