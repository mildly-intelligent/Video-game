// Win function
// Noah D.
// 9-12-2025
/*
	ScreenID: 05
	Function to draw the win screen
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var screen04 = new Scr(0o04, setup05, draw05, null).register();

var bNextLevel05;
var bTryAgain05;
var bMainMenu05;
function setup05() {
	bNextLevel05 = new Button(
		() => { /* Go to next level */ },
		"Next level"
	);
	bRetry01 = new Button(
		() => { /* Back to beginning of level */ },
		"Retry"
	);
	bMainMenu05 = new Button(
		() => { state.screen = SCREEN_IDS.MAIN_MENU; },
		"Main menu"
	);
}

function draw05() {
	background(220);
	var tmp = new TextStyle(null, BOLD, 32, null, CENTER, CENTER);
	style(tmp);
	text("You've Won!!", width/2, height/8);

	button(bNextLevel05, width*3/16, height/3, width/4, height/6);
	button(bRetry01, width*9/16, height/3, width/4, height/6);
	button(bMainMenu05, width*3/8, height*2/3, width/4, height/6);
}