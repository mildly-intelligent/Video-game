// Generic code for all levels
// Noah D.
// 01-12-26
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var screen06 = new Scr(0o06, setup_game, draw_game, null).register();

/** @type {DynamicPhysObj} */
var player = new DynamicPhysObj(new Field(240,135,50,50), {x:0,y:-500}, true, true);

function setup_game() {

}

function draw_game() {
	push();

	translate(width/2-player.hitbox.x, height/2-player.hitbox.y)

	background(220);
	text("hi", width/2, height/2)
	ellipseMode(CORNER);
	ellipse(player.hitbox.x, player.hitbox.y, player.hitbox.w, player.hitbox.h)

	if (state.active) {
		for (let id = 0; id < lv0.reg.length; id++) {
			let obj = lv0.reg[id];
			if (obj.draw) {
				rect(obj.hitbox.x, obj.hitbox.y, obj.hitbox.w, obj.hitbox.h);
			}
		}
	}

	pop();
}

function player_tick() {
	if (state.game.left && state.game.right) {
		// If both directions are pressed we don't want the character to move
		player.vel.x *= FRICTION;
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
			if (player.onFloor) {
				player.vel.y = -500;
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
	}
}