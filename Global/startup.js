// Startup function
// Noah D.
// 10-12-2025
// 10-12-2025
/*
	Code to run on the startup of the program
	Contains globally important variables such as `state`
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var state = {
	screen: SCREEN_IDS.MAIN_MENU,
	active: false,
	screens: [],
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