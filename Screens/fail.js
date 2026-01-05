// Fail function
// Noah D.
// 9-12-2025
/*
	ScreenID: 01
	Function to draw the win screen
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var screen01 = new Scr(0o01, setup_fail, draw_fail, null).register();

var bRetry01;
var bMainMenu01;
function setup_fail() {
	bRetry01 = new Button(
		() => { /* Back to beginning of level */ },
		"Retry"
	);
	bMainMenu01 = new Button(
		() => { state.screen = SCREEN_IDS.MAIN_MENU },
		"Main menu"
	);
}

function draw_fail() {
	background(220);
	style(null, BOLD, 32, null, CENTER, CENTER);
	text("You've Lost!!", width/2, height/8);

	button(bRetry01, width*3/16, height/2, width/4, height/6);
	button(bMainMenu01, width*9/16, height/2, width/4, height/6);
}