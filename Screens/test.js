// Test screen
// Noah D.
// 01-09-26
/*
	ScreenID: 70
	Screen used for testing
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var scr70 = new Scr(0o70, setup_test, draw_test, null).register();
var ground;
var wall;
var platform;


function setup_test() {
	createCanvas(480, 270)
	ground = new StaticPhysObj(new Field(0, height*7/8, width, height/8), true);
	ground.register();

	wall = new StaticPhysObj(new Field(width*7/8, 0, width/8, height), true);
	wall.register();

	platform = new PathPhysObj(
		new Field(width/6, height*5/8, width/4, height/10),
		true,
		[
			{x:width/6, y:height*5/8},
			// {x:width*3/5, y:height*5/8},
			{x:width*3/5, y:height/4},
			// {x:width/6, y:height/4},
			// {x:width*3/5, y:height*5/8},
		],
		1/2,
		true,
	);
	platform.register();

}

function draw_test() {
}