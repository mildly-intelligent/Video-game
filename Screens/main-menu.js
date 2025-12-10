// Main Menu function
// Noah D.
// 4/12/2025
// 9/12/2025
/*
	Function to draw the main menu,
	has multiple buttons that take
	you to different screens.
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

// Title image
var title;

// Buttons
var bPlay;
var bLevelSelect;
var bOptions;
var bCredits;
var bQuit;

async function setup() {
	createCanvas(480, 270);
	bPlay = new Button(
		() => { /* Set game state to active and start game loop */ },
		"Play"
	);
	bLevelSelect = new Button(
		() => { /* Set game state to level select */ },
		"Level select"
	);
	bOptions = new Button(
		() => { /* Set game state to options */ },
		"Options"
	);
	bCredits = new Button(
		() => { /* Set game state to credits */ },
		"Credits"
	);
	bQuit = new Button(
		() => {
			// Call quit function to clean up game state before exiting.
			remove()
		},
		"Quit"
	);

	// title = await loadImage('/Assets/Misc/title_small.tmp')
}

function draw() {
	background(220);
	main_menu();
}

function main_menu() {
	// 240x54
	// // Disables smoothing so the pixel art is not blurry.
	// noSmooth();
	// image(title, width/4, height/10, width/2, height/5);
	// placeholder
	text("TEMPORARY TITLE", width/4, height/10, width/2, height/5);
	button(bPlay,		width/4, height*3/8+height*1*20/270, width/2, height/16)
	button(bLevelSelect,width/4, height*3/8+height*2*20/270, width/2, height/16)
	button(bOptions,	width/4, height*3/8+height*3*20/270, width/2, height/16)
	button(bCredits,	width/4, height*3/8+height*4*20/270, width/2, height/16)
	button(bQuit,		width/4, height*3/8+height*5*20/270, width/2, height/16)
}
