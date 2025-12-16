// Driver code
// Noah D.
// 10-12-2025
// 10-12-2025
/*
	Script that handles transitioning between screens
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />


var state = {
	screen: 0o03,
	playing: false,
	register: {
		physics: {
			static: [],
			path: [],
		},
		buttons: [],
	},
	game: {
		x: 0,
		y: 0,
		xVel: 0,
		yVel: 0,
		level: 0x0,
		stage: GAME_STAGES.PAST,
	}
}


var x=100;
var y=100;
var xv=75;
var yv=0;
function setup() {
	createCanvas(480, 270);
	setup01();
	setup02();
	setup03();
	setup04();
	setup05();
	// setup07();
}


// var player = new DynamicPhysObj(new Field(240,135,25,25), new Point(100,-100), 0b0100_0000);
// var bottom = new StaticPhysObj(new Field(0, 250, 480, 20), 0b0000_0000);
// var wall = new StaticPhysObj(new Field(300, 0, 180, 270), 0b0000_0000);
// bottom.register();
// wall.register();
// function test() {
// 	rect(player.hitbox.x, player.hitbox.y, player.hitbox.w, player.hitbox.h);
// 	rect(bottom.hitbox.x, bottom.hitbox.y, bottom.hitbox.w, bottom.hitbox.h);
// 	rect(wall.hitbox.x, wall.hitbox.y, wall.hitbox.w, wall.hitbox.h);
// 	player.tick(deltaTime/1000);
// 	// raycast(new Point(width/2,height/2), new Point(100,10))
// 	// console.log(player.)
// }

function draw() {
	background(220);
	switch (state.screen) {
		case 0o00:
			draw00();
		break;
		case 0o01:
			draw01();
		break;
		case 0o02:
			draw02();
		break;
		case 0o03:
			draw03();
		break;
		case 0o04:
			draw04();
		break;
		case 0o05:
			draw05();
		break;
		case 0o10:
			test();
		break;
		default:
			draw06(ERROR_CODES.MISSING_SCREEN, state.screen);
		break;
	}
}