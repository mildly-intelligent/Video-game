/** Breaking changes, 0 means development @type {number} */
const __MAJOR__ = 1;
/** Non-breaking new features @type {number} */
const __MINOR__ = 3;
/** Non-breaking bug fixes @type {number} */
const __PATCH__ = 0;

/** Main version data, includes `major`, `minor`, and `patch` */
const __VERSION__ = `${__MAJOR__}.${__MINOR__}.${__PATCH__}`;


var opts = {
	debug: {
		enabled: false,				// If false, disables all features
		instant_time_swap: true,	// Removes the timer to swap phase
		fly: true,					// Changes up and down to move you up and down
		fly_speed: 1,				// Multiplies the max speed
		no_clip: false,				// Lets you pass through walls
		god: true,					// Makes death objects not do anything
		unlock_all_levels: true,	// All levels start unlocked
	},
	video: {
		camera_smoothing: true,		// Smooths camera movement
		crt: true,					// Adds CRT filter in the past
		bg: true,					// Enables parallax background
	},
};
// Disable everything if debugging is disabled
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
/** How much to look up and down when looking up or down */
const LOOK_DISTANCE = 125;

// This is multiplied by the speed every frame to slow the player down on the floor
/** Resistance to apply when player is on floor */
const FRICTION = 0.57;
/** Resistance to apply when player is in air */
const AIR_RESISTANCE = 0.9;

/** Amount to adjust speed while player is moving */
const PLAYER_ACC = 7.0;
/** Speed cap for the player */
const PLAYER_MAX_SPEED = 50.0 * (opts.debug.fly ? opts.debug.fly_speed : 1.0);

/** How much velocity to give the player when jumping */
const JUMP_STRENGTH = 500.0;
/** @deprecated Amount of leeway to give player when jumping early */
const JUMP_TIMER = 200;

/** Amount of time player has to press for time swap to happen */
const TIME_SWAP_DELAY = opts.debug.instant_time_swap ? 0 : 1000;

/** How often to capture player position */
const GHOST_FRAME_RATE = 10;

/** Resolution the code was made at */
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

/**
 * Statuses for levels
 * @enum
 */
const LEVEL_STATUS = Object.freeze({
	UNLOCKED: 0b001,
	COMPLETED: 0b010,
	STARRED: 0b100,
})
