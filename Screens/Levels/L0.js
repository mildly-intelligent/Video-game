// Level 1: Movement
// Noah D.
// 01-09-26
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var lv0 = new Level(0x0, setupL0a, setupL0b, drawL0a, drawL0b, "test").register();
lv0.status |= LEVEL_STATUS.UNLOCKED;

function setupL0a() {
	// change_screen(SCREEN_IDS.WIN);
	
	state.game.stage = 1;
	setupL0b();
}

function setupL0b() {
	player.hitbox.x = -200*W;
	player.hitbox.y = 200*H;

	platform(-240*W, 250*H, 960*W, 50*H, lv0.reg);
	platform(150*W, 210*H, 260*W, 40*H, lv0.reg);
	platform(250*W, 170*H, 160*W, 40*H, lv0.reg);
	platform(340*W, 130*H, 70*W, 40*H, lv0.reg);
	// new StaticPhysObj(new Field(360*W, 90*H, 30*W, 30*H), false, false, () => {
	// 	lv0.status |= LEVEL_STATUS.STARRED;
	// }).register(lv0.reg);
	new StaticPhysObj(new Field(660*W, 200*H, 30*W, 30*H), false, true, () => {
		change_screen(SCREEN_IDS.WIN);
	}).register(lv0.reg);
	}

function drawL0a() {

}

function drawL0b() {
	style_text(null, null, 24, color(0), CENTER);
	text("Press A and D or ⟵ and ⟶\nto move left and right!", -100*W, 160*H);
	text("Press SPACE or ↑ to jump!", 180*W, 140*H);
	text("This is a star!\nThere is one hidden in every level.", 425*W, 50*H);
	text("This is a portal!\nIt'll take you to the next level", 720*W, 160*H)
	fill('yellow');
	if (!lv0.starred) star(375*W, 105*H, 20, 40, 5, time);
	fill('white');
}