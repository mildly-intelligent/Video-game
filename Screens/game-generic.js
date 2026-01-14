// Generic code for all levels
// Noah D.
// 01-12-26
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var screen06 = new Scr(0o06, setup_game, draw_game, null).register();

/** @type {DynamicPhysObj} */
var player = new DynamicPhysObj(new Field(0,0,50,50), {x:0,y:0}, true, true);

// Used to add a little bit of leeway if you're trying to jump immediately after hitting the ground
var jumpTimer = 0;
var jumpTimerActive = false;

function setup_game() {
	player.hitbox.w = 25*W;
	player.hitbox.h = 25*H;
}

function draw_game() {
	push();

	translate(width/2-player.hitbox.x, height/2-player.hitbox.y)
	
	background(220);
	ellipseMode(CORNER);
	ellipse(player.hitbox.x, player.hitbox.y, player.hitbox.w, player.hitbox.h)
	
	if (state.active) {
		for (let id = 0; id < lv0.reg.length; id++) {
			let obj = state.current_level.reg[id];
			if (obj.draw) {
				rect(obj.hitbox.x, obj.hitbox.y, obj.hitbox.w, obj.hitbox.h);
			}
		}
		
		if (state.game.stage === 0) {
			state.current_level.drawA();
		} else if (state.game.stage === 1) {
			state.current_level.drawB();
		}
	}

	pop();
}

function player_tick() {
	if (jumpTimerActive) {
		if (jumpTimer >= 0) {
			jumpTimer -= deltaTime;
		} else {
			jumpTimer = 0;
			jumpTimerActive = false;
		}
	}

	if (player.onFloor && jumpTimer > 0) {
		player.vel.y += -JUMP_STRENGTH;
		jumpTimer = 0;
		jumpTimerActive = false;
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

	player.vel.x = min(max(player.vel.x, -PLAYER_MAX_SPEED), PLAYER_MAX_SPEED);
	player.vel.y = min(max(player.vel.y, -PLAYER_MAX_SPEED), PLAYER_MAX_SPEED);

	player.tick(deltaTime);
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
		case 32: case 38:
			jumpTimer = JUMP_TIMER;
			jumpTimerActive = true;
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
	}
}