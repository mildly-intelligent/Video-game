// Level Select function
// Noah D.
// 9/12/2025
// 9/12/2025
/*
	Function to draw the level select,
	has buttons for all the levels and to 
	the main menu.
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

const levels = [
	{
		number: 1,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 2,
		name: "test wordwrap",
		completed: true,
		star: true,
		unlocked: true
	},
	{
		number: 3,
		name: "movement",
		completed: false,
		star: false,
		unlocked: false
	},
	{
		number: 4,
		name: "movement",
		completed: true,
		star: false,
		unlocked: true
	},
	{
		number: 5,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 6,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 7,
		name: "movement",
		completed: false,
		star: true,
		unlocked: true
	},
	{
		number: 8,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 9,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 10,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 11,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 12,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
];

var bBack;
/** @type {Button[]} */
var bLevels = [];

function setup() {
	createCanvas(480, 270);
	bBack = new Button(
		() => { /* Set game state to main menu */ },
		"Back"
	);
	
	for (var i=0; i < 12; i++) {
		bLevels.push(new Button(
			() => { /* Go to level `i` */ },
		));
		if (levels[i].unlocked) {
			bLevels.at(-1).active = true;
		} else {
			bLevels.at(-1).active = false;
		}
		if (levels[i].completed) {
			bLevels.at(i).disp0 = (function(_) {
				fill(0,255,0);
				rect(this.x, this.y, this.w, this.h);
			}).bind(bLevels.at(-1));
			bLevels.at(i).disp1 = (function(_) {
				fill(0,220,0);
				rect(this.x, this.y, this.w, this.h);
			}).bind(bLevels.at(-1));
			bLevels.at(i).disp2 = (function(_) {
				fill(0,255,0);
				rect(this.x, this.y, this.w, this.h);
			}).bind(bLevels.at(-1));
		}
	}
}

function draw() {
	level_select();
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function level_select() {
	background(220);
	
	textAlign(CENTER, CENTER)
	text("Level Select", width/2, height/10);
	button(bBack, width/96, height*8/9, width/12, height*5/54);
	for (var i=0; i < levels.length; i++) {
		x = (i%4)*width*5/24+width/8;
		y = floor(i/4)*height*5/18 + width/8;
		w = width*5/48;
		h = height*5/27;
		button(bLevels[i], x, y, w, h)
		if (levels[i].star) {
			fill('yellow');
			star(x+10, y+10, 10,5, 5);
		}
		textAlign(CENTER, CENTER);
		textSize(24);
		fill('black');
		text(levels[i].number, x, y, w, h*3/4);
		textSize(10);
		text(levels[i].name, x, y+h*3/8, w, h*3/4);
	}
}