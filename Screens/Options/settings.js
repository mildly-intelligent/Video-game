// Settings function
// Noah D.
// 9-12-2025
// 9-12-2025
/*
	THIS IS CURRENTLY NOT USED (AND MAY NOT EVER BE)
	Function to draw the settings menu.
	Buttons to switch to different categories.
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var debug = false;

var defaults;

var bGame;
var bVideo;
var bAudio;
var bControls;
var bDebug;
var bCancel;
var bDone;

async function setup07() {
	defaults = await loadJSON('/Data/settings.default.json');
	options = getItem('settings')

	bGame = new Button(
		() => { /* Switch to game settings */ },
		"Game"
	);
	bVideo = new Button(
		() => { /* Switch to video settings */ },
		"Video"
	);
	bAudio = new Button(
		() => { /* Switch to audio settings */ },
		"Audio"
	);
	bControls = new Button(
		() => { /* Switch to controls settings */ },
		"Controls"
	);
	bDebug = new Button(
		() => { /* Switch to debug settings */ },
		"Debug"
	);
	bCancel = new Button(
		() => { /* Go back to the main menu */ },
		"Cancel"
	);
	bDone = new Button(
		() => { /* Save settings and leave */ },
		"Done"
	);
}

function draw() {
	settings();
}

function settings() {
	background(220);
	let tmpStyle = new TextStyle(null, null, 24, null, CENTER, CENTER);
	style(tmpStyle);

	text("Settings", width/2, height/16);
	button(bGame,		width/4, height*1/8, width/2, height/10);
	button(bVideo,		width/4, height*2/8, width/2, height/10);
	button(bAudio,		width/4, height*3/8, width/2, height/10);
	button(bControls,	width/4, height*4/8, width/2, height/10);
	if (debug) {
		button(bDebug,		width/4, height*5/8, width/2, height/10);
	}
	button(bDone,		width*3/16, height*7/8-height/16, width/4, height/10);
	button(bCancel,		width*9/16, height*7/8-height/16, width/4, height/10);
}