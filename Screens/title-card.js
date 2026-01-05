// Title card function
// Noah D.
// 3-12-2025
/*
	ScreenID: 04
	Function to draw the title card
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var screen04 = new Scr(0o04, setup_title_card, setup_title_card, null).register();

// let bg;
// let title;

async function setup_title_card() {
	// bg = await loadImage('/Assets/Images/Background/title_card.png');
	// title = await loadImage('/Assets/Images/Misc/title_large.png');
}

var timer = 5000;
function setup_title_card() {
	if (timer > 0) {
		// // Disables smoothing so the pixel art is not blurry.
		// noSmooth();
		// imageMode(CORNER);
		// image(bg, 0, 0, width, height);
		// imageMode(CENTER);
		// image(title, width/2, width/2, width/4, width/4);
		// Title is a placeholder
		textAlign(CENTER, CENTER);
		text('TEMPORARY TITLE', width/2,height/2);
	} else {
		state.screen = SCREEN_IDS.MAIN_MENU;
	}

	timer -= deltaTime;
}
