// Win function
// Noah D.
// 9/12/2025
// 9/12/2025
/*
	Function to draw the win screen
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var bNextLevel;
var bTryAgain;
var bMainMenu;
function setup() {
	createCanvas(480, 270);
	bNextLevel = new Button(
		() => { /* Go to next level */ },
		"Next level"
	);
	bRetry = new Button(
		() => { /* Back to beginning of level */ },
		"Retry"
	);
	bMainMenu = new Button(
		() => { /* Go to main menu */ },
		"Main menu"
	);
}

function draw() {
	win();
}

function win() {
	background(220);
	var tmp = new TextStyle(null, BOLD, 32, null, CENTER, CENTER);
	style(tmp);
	text("You've Won!!", width/2, height/8);

	button(bNextLevel, width*3/16, height/3, width/4, height/6);
	button(bRetry, width*9/16, height/3, width/4, height/6);
	button(bMainMenu, width*3/8, height*2/3, width/4, height/6);
}