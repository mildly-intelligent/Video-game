// Driver code
// Noah D.
// 10-12-2025
/*
	Script that handles transitioning between screens
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />


var player = new DynamicPhysObj(new Field(240,135,50,50), {x:0,y:-500}, 0b11_000000);


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

// Use for testing features in `dev` release
function test() {
	
}

function tick() {
	if (state.game.left && state.game.right) {
		player.vel.x = 0;
	} else if (state.game.left) {
		player.vel.x -= PLAYER_ACC;
	} else if (state.game.right) {	
		player.vel.x += PLAYER_ACC;
	} else {
		player.vel.x = 0;
	}

	player.vel.x = min(max(player.vel.x, -PLAYER_MAX_SPEED), PLAYER_MAX_SPEED);
	player.vel.y = min(max(player.vel.y, -PLAYER_MAX_SPEED), PLAYER_MAX_SPEED);

	player.tick(deltaTime);
}

function draw() {
	background(220);
	// for (let id = 0; id < state.screens.length; id++) {
	// 	let scr = state.screens[id];
	// 	if (state.screen == scr.id) {
	// 		scr.draw();
	// 	}
	// }
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
			// jump
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