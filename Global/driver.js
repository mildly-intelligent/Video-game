// Driver code
// Noah D.
// 10-12-2025
/*
	Script that handles transitioning between screens
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

/** @type {DynamicPhysObj} */
var player = new DynamicPhysObj(new Field(240,135,50,50), {x:0,y:-500}, true, true);

var fMonoton;
var fIconicIonic;
async function setup() {
	createCanvas(480, 270);

	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen == scr.id) {
			scr.setup();
		}
	}

	
	fMonoton = await loadFont('/Assets/Fonts/Monoton.ttf');
	fIconicIonic = await loadFont('/Assets/Fonts/HffIconicIonic-102e.ttf');
}

function tick() {
	if (state.game.left && state.game.right) {
		// If both directions are pressed we don't want the character to move
		player.vel.x = 0;
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


	for (let id = 0; id < state.register.physics.path.length; id++) {
		let obj = state.register.physics.path[id];
		obj.tick(deltaTime);
	}
}

function draw() {
	background(220);
	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen == scr.id) {
			scr.draw();
		}
	}
	for (let id = 0; id < state.register.physics.static.length; id++) {
		let obj = state.register.physics.static[id];
		rect(obj.hitbox.x, obj.hitbox.y, obj.hitbox.w, obj.hitbox.h);
	}
	for (let id = 0; id < state.register.physics.path.length; id++) {
		let obj = state.register.physics.path[id];
		rect(obj.hitbox.x, obj.hitbox.y, obj.hitbox.w, obj.hitbox.h);
	}
	tick();

	ellipseMode(CORNER);
	ellipse(player.pos.x, player.pos.y, 50, 50);
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