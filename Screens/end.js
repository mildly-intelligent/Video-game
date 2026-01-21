// Final win screen
// Noah D.
// 21-01-26
/*
	ScreenID: 07
	Screen to display you beat level 5
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var screen07 = new Scr(0o07, setup_end, draw_end, null).register();

var bCredits07;
var bMainMenu07;
function setup_end() {
	bCredits07 = new Button(
		() => {
			change_screen(SCREEN_IDS.CREDITS);
		},
		"Credits",
	);
	bMainMenu07 = new Button(
		() => {
			change_screen(SCREEN_IDS.MAIN_MENU);
		},
		"Main Menu",
	);
}

function draw_end() {
	style_text(null, BOLD, 32, null, CENTER, CENTER);
	text("You Beat The Game!!", width/2, height/8);

	button(bCredits07, width*3/16, height/2, width/4, height/6);
	button(bMainMenu07, width*9/16, height/2, width/4, height/6);
}