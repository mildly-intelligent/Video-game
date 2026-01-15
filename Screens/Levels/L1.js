// Level 1: Movement
// Noah D.
// 01-14-26
/// <reference path="/home/mildly-intelligent/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var lv1 = new Level(0x1, setupL1a, setupL1b, drawL1a, drawL1b, "test").register();

function setupL1a() {
	player.hitbox.x = -237.5*W;
	player.hitbox.y = 200*H;

	/** I don't know why but I just couldn't calculate the platform positions by hand */
	let math_is_hard = (n) => -250 + 200*n;

	platform(-300*W, 100*H, 50*W, 200*H, lv1.reg);
	platform(math_is_hard(0)*W, 225*H, 50*W, 20*H, lv1.reg);
	platform(math_is_hard(1)*W, 225*H, 50*W, 20*H, lv1.reg);
	platform(math_is_hard(2)*W, 225*H, 50*W, 20*H, lv1.reg);
	platform(math_is_hard(3)*W, 225*H, 50*W, 20*H, lv1.reg);
	platform(math_is_hard(4)*W, 225*H, 200*W, 20*H, lv1.reg);
}

function setupL1b() {
	player.pos = {
		x: -212.5*W,
		y: 100*H
	}
	platform(-300*W, 100*H, 50*W, 200*H, lv1.reg);
	platform(-250*W, 125*H, 100*W, 20*H, lv1.reg);
	death_object(-50*W, 225*H, 50*W, 20*H, lv1.reg);
}

function drawL1a() {

}

function drawL1b() {
}
