// Driver code
// Noah D.
// 10-12-2025
/*
	Script that handles transitioning between screens
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />





var x=100;
var y=100;
var xv=75;
var yv=0;
function setup() {
	createCanvas(480, 270);
	setup01();
	setup02();
	setup03();
	setup04();
	setup05();
	// setup07();
}

// Use for testing features in `dev` release
function test() {

}

function draw() {
	background(220);
	for (let id = 0; id < state.screens.length; id++) {
		let scr = state.screens[id];
		if (state.screen == scr.id) {
			scr.draw();
		}
	}
}