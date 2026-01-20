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

var timeOffsets02 = [];

function setup_level_select() {
	// (480, 270);
	bBack02 = new Button(
		() => { change_screen(SCREEN_IDS.MAIN_MENU); },
		"Back"
	);
	
	for (let i = 0; i < state.levels.length; i++) {
		timeOffsets02.push(random(0, 1))
		let _ = new Button(
			() => {
				state.active = true;
				state.game.level = i;
				change_screen(SCREEN_IDS.GAME_ACTIVE);
			},
		);
		bLevels02.push(_);

		if (state.levels[i].unlocked) {
			bLevels02.at(i).active = true;
		} else {
			bLevels02.at(i).active = false;
		}
		if (state.levels[i].completed) {
			bLevels02.at(i).disp0 = (function(_) {
				fill(0,255,0);
				rect(this.x, this.y, this.w, this.h);
			}).bind(bLevels02.at(i));
			bLevels02.at(i).disp1 = (function(_) {
				fill(0,220,0);
				rect(this.x, this.y, this.w, this.h);
			}).bind(bLevels02.at(i));
			bLevels02.at(i).disp2 = (function(_) {
				fill(0,255,0);
				rect(this.x, this.y, this.w, this.h);
			}).bind(bLevels02.at(i));
		}
	}
}

function draw_level_select() {
	background(220);
	
	style_text(null, BOLD, 32, null, CENTER, CENTER)
	text("Level Select", width/2, height/10);
	button(bBack02, width/96, height*8/9, width/12, height*5/54);
	for (var i=0; i < state.levels.length; i++) {
		x = (i%5)*width*4/24+width/8;
		y = floor(i/5)*height*5/18 + width/5;
		w = width*5/48;
		h = height*5/27;
		button(bLevels02[i], x, y, w, h)
		if (state.levels[i].starred) {
			fill('yellow');
			star(x+10, y+10, 10,5, 5, time+timeOffsets02[i]);
		}
		textAlign(CENTER, CENTER);
		textSize(24);
		fill('black');
		text(state.levels[i].id+1, x, y, w, h*3/4);
		textSize(10);
		text(state.levels[i].name, x, y+h*3/8, w, h*3/4);
	}
}