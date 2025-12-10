// Title card function
// Noah D.
// 3/12/2025
// 10/12/2025
/*
	Function to draw the title card
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

// let bg;
// let title;

async function setup() {
	createCanvas(480, 270);
	// bg = await loadImage('/Assets/Images/Background/title_card.png');
	// title = await loadImage('/Assets/Images/Misc/title_large.png');
}
function draw() {
	title_card();
}

function title_card() {
	// // Disables smoothing so the pixel art is not blurry.
	// noSmooth();
	// imageMode(CORNER);
	// image(bg, 0, 0, width, height);
	// imageMode(CENTER);
	// image(title, width/2, width/2, width/4, width/4);
	// Title is a placeholder
	textAlign(CENTER, CENTER);
	text('TEMPORARY TITLE', width/2,height/2);
}
