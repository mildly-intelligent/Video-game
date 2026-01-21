// Constants
// Noah D.
// 9-12-2025
/*
	Global variables for use anywhere
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />


/** Breaking changes, 0 means development @type {number} */
const __MAJOR__ = 1;
/** Non-breaking new features @type {number} */
const __MINOR__ = 2;
/** Non-breaking bug fixes @type {number} */
const __PATCH__ = 0;

/** Main version data, includes `major`, `minor`, and `patch` */
const __VERSION__ = `${__MAJOR__}.${__MINOR__}.${__PATCH__}`;


var opts = {
	debug: {
		enabled: true,
		instant_time_swap: true,
		fly: true,
		fly_speed: 1,
		no_clip: false,
		god: true,
		grid_lines: true,
		unlock_all_levels: true,
	},
	video: {
		camera_smoothing: true,
		crt: true,
	},
};
if (!opts.debug.enabled) {
	opts.debug.instant_time_swap = false;
	opts.debug.fly = false;
	opts.debug.no_clip = false;
	opts.debug.god = false;
	opts.debug.grid_lines = false;
	opts.debug.unlock_all_levels = false;
}


// The acceleration due to gravity is split into the speed slowing you down when you move up, and the
//	the speed speeding you up when you move down. I learned this trick from @InboundShovel on YouTube.
// The purpose of this is to improve the feel and handling of the game.
/** Gravity while moving up */
const GRAVITY_UP = 105;
/** Gravity while moving down */
const GRAVITY_DOWN = 175;

/** 
 * Instead of the camera directly following the player, the camera will move towards the player at
 * 		this speed, this helps make the camera feel more natural. This value should be from 0-1. A
 *  	value of zero results in a static camera and a value of one results in no smoothing.
 * 
 * Behaviors for values higher than one are listed below for fun.
 * * 1.0 - ~1.5 -- No noticeable difference
 * * ~1.5 - 1.999 -- "Bouncy" camera
 * * 2.0 -- Flickery and out of frame
 * * \>2.0 -- Fully out of frame
 * 
 * I also learned *this* trick from InboundShovel.
 */
const CAMERA_DELAY = opts.video.camera_smoothing ? 0.27 : 0.9;
const LOOK_DISTANCE = 125;

// This is multiplied by the speed every frame to slow the player down on the floor
const FRICTION = 0.57;
const AIR_RESISTANCE = 0.9;

const PLAYER_ACC = 7.0;
const PLAYER_MAX_SPEED = 50.0 * (opts.debug.fly ? opts.debug.fly_speed : 1.0);

const JUMP_STRENGTH = 500.0;
const JUMP_TIMER = 200;

const TIME_SWAP_DELAY = opts.debug.instant_time_swap ? 0 : 1000;

/** How often to capture player position */
const GHOST_FRAME_RATE = 10;

// Resolution the code was made at
const NATIVE_RESOLUTION = {
	width: 480,
	height: 270,
}

/**
 * Enum of error names and IDs
 * @enum
 * @deprecated
 */
const ERROR_CODES = Object.freeze({
	MISSING_SCREEN:		0x00,
});

/**
 * Enum of error IDs and messages
 * @enum
 * @deprecated
 */
const ERROR_MESSAGES = Object.freeze({
	0x00: (...[[ID]]) => `No screen with ID: 0o${ID.toString(8).padStart(2, '0')}`,
});

/**
 * IDs for the different screens
 * @enum
 */
const SCREEN_IDS = Object.freeze({
	CREDITS: 0o00,
	FAIL: 0o01,
	LEVEL_SELECT: 0o02,
	MAIN_MENU: 0o03,
	WIN: 0o05,
	GAME_ACTIVE: 0o06,
	END: 0o07,
	
	ERROR: 0o71,
});

const LEVEL_STATUS = Object.freeze({
	UNLOCKED: 0b001,
	COMPLETED: 0b010,
	STARRED: 0b100,
})
