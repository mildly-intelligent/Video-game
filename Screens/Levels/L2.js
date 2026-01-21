var lv2 = new Level(2, setupL2a, setupL2b, drawL2a, drawL2b, "Dodge and Weave").register();
if (opts.debug.unlock_all_levels) lv2.status |= LEVEL_STATUS.UNLOCKED;

function setupL2a() {
	player.hitbox.x = -380*W;
	player.hitbox.y = 175*H;

	platform(-400*W, 220*H, 200*W, 20*H, lv2.reg);
	one_way_platform(-250*W, 140*H, 50*W, lv2.reg);
	platform(-100*W, 280*H, 350*W, 20*H, lv2.reg);
	one_way_platform(150*W, 190*H, 100*W, lv2.reg);
	platform(250*W, 190*H, 550*W, 20*H, lv2.reg);
}

function setupL2b() {
	player.hitbox.x = -500*W;
	player.hitbox.y = -20*H;

	platform(-550*W, 40*H, 150*W, 20*H, lv2.reg);
	death_object(-315*W, -200*H, 50*W, 350*H, lv2.reg);

	new StaticPhysObj(
		new Field(-225*W, -50*H, 30*W,30*H),
		false, false,
		() => {
			state.game.star_collected = true;
			lv2.status |= LEVEL_STATUS.STARRED;
		},
	).register(lv2.reg);
	platform(-125*W, 100*H, 200*W, 20*H, lv2.reg);
	death_object(-125*W, 120*H, 50*W, 150*H, lv2.reg);
	platform(400*W, 100*H, 200*W, 20*H, lv2.reg);
	death_object(400*W, 120*H, 50*W, 150*H, lv2.reg);
	platform(925*W, 100*H, 200*W, 20*H, lv2.reg);
	new StaticPhysObj(
		new Field(1010*W, 60*H, 30*W,30*H),
		false, true,
		() => {
			lv2.status |= LEVEL_STATUS.COMPLETED;
			lv3.status |= LEVEL_STATUS.UNLOCKED;
			change_screen(SCREEN_IDS.WIN);
		},
		function() {
			fill('lime');
			rect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h);
			fill('white');
		}
	).register(lv2.reg);
}

function drawL2a() {
	if (lv2.starred) {
		fill('gray');
	} else {
		fill('yellow');
	}
	if (!state.game.star_collected) star(-225*W, -50*H, 20, 40, 5, time);
	fill('white');
}

function drawL2b() {
	if (lv2.starred) {
		fill('gray');
	} else {
		fill('yellow');
	}
	if (!state.game.star_collected) star(-225*W, -50*H, 20, 40, 5, time);
	fill('white');
}
