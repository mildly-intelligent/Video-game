// Level Select function
// Noah D.
// 9-12-2025
/*
	ScreenID: 02
	Function to draw the level select,
	has buttons for all the levels and to 
	the main menu.
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var screen02 = new Scr(0o02, setup_level_select, draw_level_select, null).register();

var bBack02;
/** @type {Button[]} */
var bLevels02 = [];

function setup_level_select() {
	// (480, 270);
	bBack02 = new Button(
		() => { state.screen = SCREEN_IDS.MAIN_MENU; },
		"Back"
	);
	
	for (var i=0; i < 12; i++) {
		bLevels02.push(new Button(
			() => { /* Go to level `i` */ },
		));
		if (LEVELS[i].unlocked) {
			bLevels02.at(-1).active = true;
		} else {
			bLevels02.at(-1).active = false;
		}
		if (LEVELS[i].completed) {
			bLevels02.at(i).disp0 = (function(_) {
				fill(0,255,0);
				rect(this.x, this.y, this.w, this.h);
			}).bind(bLevels02.at(-1));
			bLevels02.at(i).disp1 = (function(_) {
				fill(0,220,0);
				rect(this.x, this.y, this.w, this.h);
			}).bind(bLevels02.at(-1));
			bLevels02.at(i).disp2 = (function(_) {
				fill(0,255,0);
				rect(this.x, this.y, this.w, this.h);
			}).bind(bLevels02.at(-1));
		}
	}
}

function draw_level_select() {
	background(220);
	
	textAlign(CENTER, CENTER)
	text("Level Select", width/2, height/10);
	button(bBack02, width/96, height*8/9, width/12, height*5/54);
	for (var i=0; i < LEVELS.length; i++) {
		x = (i%4)*width*5/24+width/8;
		y = floor(i/4)*height*5/18 + width/8;
		w = width*5/48;
		h = height*5/27;
		button(bLevels02[i], x, y, w, h)
		if (LEVELS[i].star) {
			fill('yellow');
			star(x+10, y+10, 10,5, 5);
		}
		textAlign(CENTER, CENTER);
		textSize(24);
		fill('black');
		text(LEVELS[i].number, x, y, w, h*3/4);
		textSize(10);
		text(LEVELS[i].name, x, y+h*3/8, w, h*3/4);
	}
}