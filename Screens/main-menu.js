var screen03 = new Scr(0o03, setup_main_menu, draw_main_menu, tick_main_menu).register();

// Title image
var iTitle03;

// Buttons
var bPlay03;
var bLevelSelect03;
var bCredits03;
var bPhotosensitive03;
var bQuit03;

async function setup_main_menu() {
	bPlay03 = new Button(
		() => {
			state.active = true;
			state.game.level = 0x0;
			change_screen(SCREEN_IDS.GAME_ACTIVE);
		},
		"Play",
	);
	bLevelSelect03 = new Button(
		() => { change_screen(SCREEN_IDS.LEVEL_SELECT); },
		"Level Select",
	);
	bCredits03 = new Button(
		() => { change_screen(SCREEN_IDS.CREDITS); },
		"Credits",
	);
	bPhotosensitive03 = new Button(
		() => { opts.video.crt = !opts.video.crt; },
		"Photosensitivity mode",
		{ font: 'Courier New', size: 10 },
	)
	bQuit03 = new Button(
		() => {
			// Call quit function to clean up game state before exiting.
			remove()
		},
		"Quit",
	);

	// title = await loadImage('/Assets/Misc/title_small.tmp')
}

function draw_main_menu() {
	title(0, height/10, width, height/4);
	button(bPlay03,			width/4, height*3/8+height*1*30/270, width/2, height/12);
	button(bLevelSelect03,	width/4, height*3/8+height*2*30/270, width/2, height/12);
	button(bCredits03,		width/4, height*3/8+height*3*30/270, width/2, height/12);
	button(bQuit03,			width/4, height*3/8+height*4*30/270, width/2, height/12);

	button(bPhotosensitive03, width*37/48, height*7/8, width*5/24, height/16)
}

function tick_main_menu() {
	if (opts.video.crt) {
		bPhotosensitive03.disp0 = (function() {
			fill(255);
			rect(this.x, this.y, this.w, this.h);
		}).bind(bPhotosensitive03);
	} else {
		bPhotosensitive03.disp0 = (function() {
			fill(0,255,0);
			rect(this.x, this.y, this.w, this.h);
		}).bind(bPhotosensitive03);
	}

	if (opts.video.crt) {
		bPhotosensitive03.disp1 = (function() {
			fill(230);
			rect(this.x, this.y, this.w, this.h);
		}).bind(bPhotosensitive03);
	} else {
		bPhotosensitive03.disp1 = (function() {
			fill(0,220,0);
			rect(this.x, this.y, this.w, this.h);
		}).bind(bPhotosensitive03);
	}

	if (opts.video.crt) {
		bPhotosensitive03.disp2 = (function() {
			fill(255);
			rect(this.x, this.y, this.w, this.h);
		}).bind(bPhotosensitive03);
	} else {
		bPhotosensitive03.disp2 = (function() {
			fill(0,255,0);
			rect(this.x, this.y, this.w, this.h);
		}).bind(bPhotosensitive03);
	}
}