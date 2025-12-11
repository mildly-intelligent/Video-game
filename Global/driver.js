// Driver code
// Noah D.
// 10-12-2025
// 10-12-2025
/*
	Script that handles transitioning between screens
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />


function setup() {
	createCanvas(480, 270);
	setup01();
	setup02();
	setup03();
	setup04();
	setup05();
	// setup07();
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
		default:
			draw06(ERROR_CODES.MISSING_SCREEN, state.screen);
		break;
	}
}