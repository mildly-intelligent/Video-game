// Level 1: Movement
// Noah D.
// 01-09-26
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var lv0 = new Level(0x0, setupL0a, setupL0b, drawL0a, drawL0b, "test").register();


var idk = 0;
function setupL0a() {
	new StaticPhysObj(new Field(10, height/2, width/4, height/4), true, true).register(lv0.reg);
	new StaticPhysObj(new Field(width/2, height/2, width/4, height/4), true, true).register(lv0.reg);
	new StaticPhysObj(new Field(360, 0, 20, 270), false, true, swap_phase.bind(lv0)).register(lv0.reg);
}

function setupL0b() {
	new StaticPhysObj(new Field(100, height/2, width/4, height/4), true).register(lv0.reg);
	new StaticPhysObj(new Field(200, height/2, width/4, height/4), true).register(lv0.reg);
}

function drawL0a() {

}

function drawL0b() {

}