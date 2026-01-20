// Level 2: Movement
// Noah D.
// 01-14-26
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var lv1 = new Level(1, setupL1a, setupL1b, drawL1a, drawL1b, "Time").register();
if (opts.debug.unlock_all_levels) lv1.status |= LEVEL_STATUS.UNLOCKED;

/** I don't know why but I just couldn't calculate the platform positions by hand */
let math_is_hard = (n) => 200*n - 250;

function setupL1a() {
	player.hitbox.x = -237.5*W;
	player.hitbox.y = 200*H;

	platform(-300*W, 100*H, 50*W, 200*H, lv1.reg);
	platform(math_is_hard(0)*W, 225*H, 50*W, 20*H, lv1.reg);
	platform(math_is_hard(1)*W, 225*H, 50*W, 20*H, lv1.reg);
	platform(math_is_hard(2)*W, 225*H, 50*W, 20*H, lv1.reg);
	platform(math_is_hard(3)*W, 225*H, 50*W, 20*H, lv1.reg);
	platform(math_is_hard(4)*W, 225*H, 500*W, 20*H, lv1.reg);
	platform(1000*W, 125*H, 50*W, 100*H, lv1.reg);
	platform(1000*W, 125*H, 150*W, 25*H, lv1.reg);
}

function setupL1b() {
	player.pos = {
		x: -212.5*W,
		y: 100*H
	}
	platform(-300*W, 100*H, 50*W, 200*H, lv1.reg);
	platform(math_is_hard(0)*W, 125*H, 100*W, 20*H, lv1.reg);
	death_object(math_is_hard(1)*W, 225*H, 50*W, 20*H, lv1.reg);
	death_object(math_is_hard(2)*W, 225*H, 50*W, 20*H, lv1.reg);
	death_object(math_is_hard(3)*W, 225*H, 50*W, 20*H, lv1.reg);
	platform(math_is_hard(4)*W, 225*H, 500*W, 20*H, lv1.reg);
	platform(1000*W, 125*H, 50*W, 100*H, lv1.reg);
	platform(1000*W, 125*H, 150*W, 25*H, lv1.reg);
	new StaticPhysObj(
		new Field(1060*W, 55*H, 30*W,30*H),
		false, false,
		() => {
			state.star_collected = true;
			lv1.status |= LEVEL_STATUS.STARRED;
		},
	).register(lv1.reg);
	platform(675*W, 150*H, 100*W, 20*H, lv1.reg);
	new StaticPhysObj(
		new Field(710*W, 100*H, 30*W,30*H),
		false, true,
		() => {
			lv1.status |= LEVEL_STATUS.COMPLETED;
			lv2.status |= LEVEL_STATUS.UNLOCKED;
			change_screen(SCREEN_IDS.WIN);
		},
		function() {
			fill('lime');
			rect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h);
			fill('white');
		}
	).register(lv1.reg);
}

function drawL1a() {
	style_text(null, null, 24, color(0), CENTER);
	text("Right place; wrong time ;)\n Hold Q to go back in time!", 625*W, 190*H);
	text("I wonder how to get higher up...?", 1075*W, 25*H);
	if (lv1.starred) {
		fill('gray');
	} else {
		fill('yellow');
	}
	if (!state.game.star_collected) star(1075*W, 70*H, 20, 40, 5, time);
	fill('white');
}

function drawL1b() {
	style_text(null, null, 18, color(150), CENTER)
	text("Press ↑ and ↓ to look up and down.", -200*W, 75*H);
	style_text(null, null, 20, color(0), CENTER);
	text("This is your ghost! It copies whatever you did in the past.\nTry standing on it! (hold Q again to go back to the past.)", -200*W, 250*H);
	text("Stars will be in the same place throughout time.", 1075*W, 25*H);
	if (lv1.starred) {
		fill('gray');
	} else {
		fill('yellow');
	}
	if (!state.game.star_collected) star(1075*W, 70*H, 20, 40, 5, time);
	fill('white');
}
