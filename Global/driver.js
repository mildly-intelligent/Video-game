// Driver code
// Noah D.
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

// Use for testing features in `dev` release
function test() {

}

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