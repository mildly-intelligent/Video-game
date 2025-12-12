// Driver code
// Noah D.
// 10-12-2025
// 10-12-2025
/*
	Script that handles transitioning between screens
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />


var state = {
	screen: 0o10,
	playing: false,
	register: {
		collision: [],
		buttons: []
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

function test() {
	// background(0)
	circle(x, y, 50)
	let wall = new Field(460, 0, 20, 270);
	let playhb = new Field(x-25,y-25,50,50);
	rect(wall.x,wall.y,wall.w,wall.h);
	// rect(playhb.x,playhb.y,playhb.w,playhb.h);
	x += xv*deltaTime/1000;
	y += yv*deltaTime/1000;
	if (playhb.intersects(wall)) {
		fill('red')
		xv *= -1
	} else {
		fill('blue')
	}
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