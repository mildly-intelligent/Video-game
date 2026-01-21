// Level 5: Movement
// Noah D.
// 01-16-26
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

var lv4 = new Level(4, setupL4a, setupL4b, drawL4a, drawL4b, "Walls").register();
if (opts.debug.unlock_all_levels) lv4.status |= LEVEL_STATUS.UNLOCKED;

var bSquareL4 = false;
var bCircleL4 = false;
var bTriangleL4 = false;
var bStarL4 = false;

let timeAtSwap = 0;

function setupL4a() {
	bSquareL4 = false;
	bCircleL4 = false;
	bTriangleL4 = false;
	bStarL4 = false;

	player.hitbox.x = -25*W;
	player.hitbox.y = 0*H;

	platform(-100*W, 50*H, 200*W, 20*H, lv4.reg);
	death_object(-100*W, -150*H, 20*W, 200*H, lv4.reg);
	death_object(75*W, 70*H, 25*W, 300*H, lv4.reg);
	death_object(250*W, -200*H, 25*W, 575*H, lv4.reg);
	platform(50*W, 500*H, 450*W, 20*H, lv4.reg);
	platform(300*W, -100*H, 175*W, 20*H, lv4.reg);
	platform(650*W, 500*H, 250*W, 20*H, lv4.reg);
	platform(1100*W, 500*H, 100*W, 20*H, lv4.reg);
	death_object(825*W, -150*H, 25*W, 100*H, lv4.reg);
	new PathPhysObj(
		new Field(-100*W, 500*H, 100*W, 20*H),
		[
			{x: -100*W, y: 500*H},
			{x: -100*W, y: 200*H},
		],
		0.5, true,
		true, true,
	).register(lv4.reg);
	new PathPhysObj(
		new Field(275*W, 500*H, 100*W, 20*H),
		[
			{x: 525*W, y: 500*H},
			{x: 525*W, y: -100*H},
			{x: 1125*W, y: -100*H},
		],
		0.25, true,
		true, true,
	).register(lv4.reg);
	new StaticPhysObj(
		new Field(-75*W, 175*H, 50*W, 25*H),
		false, true,
		() => { bTriangleL4 = true; },
		function() {
			bTriangleL4 ? fill('green') : fill('white');
			rect(this.hitbox.x,this.hitbox.y, this.hitbox.w, this.hitbox.h);
			fill('white');
		},
	).register(lv4.reg);
	new StaticPhysObj(
		new Field(362.5*W, -125*H, 50*W, 25*H),
		false, true,
		() => { bSquareL4 = true; },
		function() {
			bSquareL4 ? fill('green') : fill('white');
			rect(this.hitbox.x,this.hitbox.y, this.hitbox.w, this.hitbox.h);
			fill('white');
		},
	).register(lv4.reg);
	new StaticPhysObj(
		new Field(750*W, 475*H, 50*W, 25*H),
		false, true,
		() => { bCircleL4 = true; },
		function() {
			bCircleL4 ? fill('green') : fill('white');
			rect(this.hitbox.x,this.hitbox.y, this.hitbox.w, this.hitbox.h);
			fill('white');
		},
	).register(lv4.reg);
	new StaticPhysObj(
		new Field(1162.5*W, -125*H, 50*W, 25*H),
		false, true,
		() => { bStarL4 = true; },
		function() {
			bStarL4 ? fill('green') : fill('white');
			rect(this.hitbox.x,this.hitbox.y, this.hitbox.w, this.hitbox.h);
			fill('white');
		},
	).register(lv4.reg);
}

function setupL4b() {
	player.hitbox.x = 987.5*W;
	player.hitbox.y = -300*H;
	player.vel = {x: 0, y: 0};

	platform(1100*W, 550*H, 100*W, 20*H, lv4.reg);
	platform(1200*W, 450*H, 25*W, 120*H, lv4.reg);
	death_object(100*W, 20*H, 987.5*W, 30*H, lv4.reg);
	death_object(100*W, 20*H, 30*W, 150*H, lv4.reg);
	death_object(-50*W, -200*H, 10*W, 700*H, lv4.reg);
	death_object(100*W, 320*H, 30*W, 150*H, lv4.reg);
	platform(130*W, 270*H, 1500*W, 20*H, lv4.reg);
	if (!bStarL4) death_object(100*W, 170*H, 30*W, 150*H, lv4.reg);
	if (!bCircleL4) death_object(-50*W, 400*H, 150*W, 30*H, lv4.reg);
	if (!bSquareL4) death_object(493.75*W, 400*H, 30*W, 200*H, lv4.reg);
	if (!bTriangleL4) death_object(600*W, -200*H, 30*W, 250*H, lv4.reg);
	new PathPhysObj(
		new Field(987.5*W, 0, 100*W, 20*H),
		[
			{x: 987.5*W, y: 0*H},
			{x: 493.75*W, y: 0*H},
			{x: 0*W, y: 0*H},
			{x: 0*W, y: 275*H},
			{x: 0*W, y: 275*H},
			{x: 0*W, y: 550*H},
			{x: 493.75*W, y: 550*H},
			{x: 987.5*W, y: 550*H},
		],
		0.25, true,
		true, true,
	).register(lv4.reg);
	new StaticPhysObj(
		new Field(1475*W, 230*H, 30*W, 30*H),
		false, false,
		() => {
			state.game.star_collected = true;
			lv4.status |= LEVEL_STATUS.STARRED;
		},
	).register(lv4.reg);
	new StaticPhysObj(
		new Field(1250*W, 445*H, 30*W, 30*H),
		false, true,
		() => {
			lv4.status |= LEVEL_STATUS.COMPLETED;
			change_screen(SCREEN_IDS.WIN);
		},
		function() {
			fill('lime');
			rect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h);
			fill('white');
		},
	).register(lv4.reg);
	timeAtSwap = time;
}

function drawL4a() {
	if (lv4.starred) {
		fill('gray');
	} else {
		fill('yellow');
	}
	if (!state.game.star_collected) star(1490*W, 245*H, 20, 40, 5, time);
	fill('white');

	strokeWeight(5);
	noFill();
	triangle(
		(-50+0)*W, (187.5-7.5)*H,
		(-50-8)*W, (187.5+7.5)*H,
		(-50+8)*W, (187.5+7.5)*H,
	);
	rectMode(CENTER);
	rect(
		(362.5+25)*W, (-125+12.5)*H,
		15*W, 15*H,
	);
	rectMode(CORNER);
	circle((750+25)*W, (475+12.5)*H, 12.5*W);
	star((1162.5+25)*W, (-125+12.5)*H, 5*W, 10*W, 5);
	fill('white');
	strokeWeight(1);
}

function drawL4b() {
	if (time - timeAtSwap < 0.05) {
		player.hitbox.y = -100;
	}

	if (lv4.starred) {
		fill('gray');
	} else {
		fill('yellow');
	}
	if (!state.game.star_collected) star(1490*W, 245*H, 20, 40, 5, time);
	fill('white');

	strokeWeight(5);
	noFill();
	triangle(
		(615+0)*W, (-75-7.5)*H,
		(615-8)*W, (-75+7.5)*H,
		(615+8)*W, (-75+7.5)*H,
	);
	rectMode(CENTER);
	rect(
		(493.75+15)*W, (400+100)*H,
		15*W, 15*H,
	);
	rectMode(CORNER);
	circle((-50+75)*W, (400+15)*H, 12.5*W);
	star((100+15)*W, (170+75)*H, 5*W, 10*W, 5);
	fill('white');
	strokeWeight(1);
}
