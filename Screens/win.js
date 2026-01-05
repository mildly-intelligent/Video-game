// Win function
// Noah D.
// 9-12-2025
/*
	ScreenID: 05
	Function to draw the win screen
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var screen04 = new Scr(0o04, setup_win, draw_win, null).register();

var bNextLevel05;
var bTryAgain05;
var bMainMenu05;
function setup_win() {
	bNextLevel05 = new Button(
		() => { /* Go to next level */ },
		"Next level"
	).register();
	bRetry01 = new Button(
		() => { /* Back to beginning of level */ },
		"Retry"
	).register();
	bMainMenu05 = new Button(
		() => { state.screen = SCREEN_IDS.MAIN_MENU; },
		"Main menu"
	).register();
}

function draw_win() {
	background(220);
	style(null, BOLD, 32, null, CENTER, CENTER);
	text("You've Won!!", width/2, height/8);

	button(bNextLevel05, width*3/16, height/3, width/4, height/6);
	button(bRetry01, width*9/16, height/3, width/4, height/6);
	button(bMainMenu05, width*3/8, height*2/3, width/4, height/6);
}