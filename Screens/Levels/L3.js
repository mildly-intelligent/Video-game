// Level 4: Movement
// Noah D.
// 01-16-26
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var lv3 = new Level(3, setupL3a, setupL3b, drawL3a, drawL3b, "Locks").register();
if (opts.debug.unlock_all_levels) lv3.status |= LEVEL_STATUS.UNLOCKED;

var bTriangleL3 = false;
var bStarL3 = false;

function setupL3a() {
	player.hitbox.y = 0;
	player.hitbox.x = -12.5*W;

	platform(-50*W, 50*H, 100*W, 20*H, lv3.reg);
	death_object(-50*W, 70*H, 40*W, 170*H, lv3.reg);
	platform(-250*W-50*W, 220*H, 250*W, 20*H, lv3.reg);
	death_object(-290*W-50*W, 170*H, 40*W, 70*H, lv3.reg);
	platform(-290*W-50*W, 150*H, 40*W, 20*H, lv3.reg);
	new PathPhysObj(
		new Field(-450*W, 200*H, 90*W, 20*H),
		[
			{x: -450*W, y: 200*H},
			{x: -450*W, y: -125*H},
		],
		0.5, true,
		true, true,
	).register(lv3.reg);
	platform(-650*W,-100*H,190*W,20*H, lv3.reg);
	new StaticPhysObj(
		new Field(-575*W, -125*H, 50*W, 25*H),
		false, true,
		() => { bTriangleL3 = true; },
		function() {
			bTriangleL3 ? fill('green') : fill('white');
			rect(this.hitbox.x,this.hitbox.y, this.hitbox.w, this.hitbox.h);
			fill('white');
		}
	).register(lv3.reg);
	death_object(-290*W-50*W, -250*H, 40*W, 300*H, lv3.reg);
	death_object(-180*W, 20*H, 60*W, 130*H, lv3.reg);
	platform(-180*W, 10*H, 60*W, 20*H, lv3.reg);
	platform(-250*W, 80*H, 70*W, 20*H, lv3.reg);
	death_object(-120*W, -500*H, 10*W, 650*H, lv3.reg);
	platform(-300*W, -50*H, 60*W, 20*H, lv3.reg);
	new StaticPhysObj(
		new Field(-295*W, -75*H, 50*W, 25*H),
		false, true,
		() => { bStarL3 = true; },
		function() {
			bStarL3 ? fill('green') : fill('white');
			rect(this.hitbox.x,this.hitbox.y, this.hitbox.w, this.hitbox.h);
			fill('white');
		}
	).register(lv3.reg);
}

function setupL3b() {
	player.hitbox.y = 0;
	player.hitbox.x = 182.5*W;

	new PathPhysObj(
		new Field(100*W, 0*H, 150*W, 20*H, lv3.reg),
		[
			{x: 100*W, y: 0*H},
			{x: 600*W, y: 0*H},
		],
		0.25, true,
		true, true
	).register(lv3.reg);
	death_object(100*W, -65*H, 50*W, 200*H, lv3.reg);
	death_object(100*W, -65*H, 280*W, 20*H, lv3.reg);
	death_object(540*W, -65*H, 260*W, 20*H, lv3.reg);
	death_object(780*W, -65*H, 20*W, 200*H, lv3.reg);
	if (!bTriangleL3) death_object(600*W, -65*H, 50*W, 200*H, lv3.reg);
	if (!bStarL3) death_object(380*W, -70*H, 180*W, 30*H, lv3.reg);
	platform(540*W, -85*H, 100*W, 20*H, lv3.reg);
	new StaticPhysObj(
		new Field(700*W, -35*H, 30*W, 30*H),
		false, true,
		() => {
			lv3.status |= LEVEL_STATUS.COMPLETED;
			lv4.status |= LEVEL_STATUS.UNLOCKED;
			change_screen(SCREEN_IDS.WIN);
		},
		function() {
			fill('lime');
			rect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h);
			fill('white');
		},
	).register(lv3.reg);
	new StaticPhysObj(
		new Field(575*W, -140*H, 30*W,30*H),
		false, false,
		() => {
			state.game.star_collected = true;
			lv3.status |= LEVEL_STATUS.STARRED;
		},
	).register(lv3.reg);
}

function drawL3a() {
	strokeWeight(5);
	noFill();
	triangle(
		-550*W, -120*H,
		-558*W, -105*H,
		-542*W, -105*H,
	);
	star(-270*W, -62.5*H, 5*W, 10*W, 5);
	strokeWeight(1);

	if (lv3.starred) {
		fill('gray');
	} else {
		fill('yellow');
	}
	if (!state.game.star_collected) star(590*W, -125*H, 20, 40, 5, time);
	fill('white');
}

function drawL3b() {
	strokeWeight(5);
	noFill();
	triangle(
		625*W, -7.5*H,
		617*W, +7.5*H,
		633*W, +7.5*H,
	);
	star(470*W, -55*H, 5*W, 10*W, 5);
	strokeWeight(1);

	if (lv3.starred) {
		fill('gray');
	} else {
		fill('yellow');
	}
	if (!state.game.star_collected) star(590*W, -125*H, 20, 40, 5, time);
	fill('white');
}
