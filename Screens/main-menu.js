// Main Menu function
// Noah D.
// 4-12-2025
// 10-12-2025
/*
	ScreenID: 03
	Function to draw the main menu,
	has multiple buttons that take
	you to different screens.
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

// Title image
var iTitle03;

// Buttons
var bPlay03;
var bLevelSelect03;
var bOptions03;
var bCredits03;
var bQuit03;

async function setup03() {
	bPlay03 = new Button(
		() => { /* Set game state to active and start game loop */ },
		"Play"
	);
	bLevelSelect03 = new Button(
		() => { state.screen = SCREEN_IDS.LEVEL_SELECT; },
		"Level select"
	);
	bOptions03 = new Button(
		() => { /* Set game state to options */ },
		"Options"
	);
	bCredits03 = new Button(
		() => { state.screen = SCREEN_IDS.CREDITS; },
		"Credits"
	);
	bQuit03 = new Button(
		() => {
			// Call quit function to clean up game state before exiting.
			remove()
		},
		"Quit"
	);

	// title = await loadImage('/Assets/Misc/title_small.tmp')
}

function draw03() {
	// 240x54
	// // Disables smoothing so the pixel art is not blurry.
	// noSmooth();
	// image(title, width/4, height/10, width/2, height/5);
	// placeholder
	text("TEMPORARY TITLE", width/4, height/10, width/2, height/5);
	button(bPlay03,		width/4, height*3/8+height*1*20/270, width/2, height/16);
	button(bLevelSelect03,width/4, height*3/8+height*2*20/270, width/2, height/16);
	button(bOptions03,	width/4, height*3/8+height*3*20/270, width/2, height/16);
	button(bCredits03,	width/4, height*3/8+height*4*20/270, width/2, height/16);
	button(bQuit03,		width/4, height*3/8+height*5*20/270, width/2, height/16);
	let sVersion = new TextStyle(null, ITALIC, 10, color(50), LEFT, BOTTOM);
	style(sVersion);
	
	text(__VERSION__, 0, 0, width/2, height);
}
