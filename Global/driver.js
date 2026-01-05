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
	setup77();
	// setup07();
}

function draw() {
	background(220);
	switch (state.screen) {
		case SCREEN_IDS.CREDITS:
			draw00();
		break;
		case SCREEN_IDS.FAIL:
			draw01();
		break;
		case SCREEN_IDS.LEVEL_SELECT:
			draw02();
		break;
		case SCREEN_IDS.MAIN_MENU:
			draw03();
		break;
		case SCREEN_IDS.TITLE_CARD:
			draw04();
		break;
		case SCREEN_IDS.WIN:
			draw05();
		break;
		case 0o77:
			draw77();
		break;
		default:
			draw06(ERROR_CODES.MISSING_SCREEN, state.screen);
		break;
	}
	console.log(state.screen)
}