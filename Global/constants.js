// Constants
// Noah D.
// 9-12-2025
/*
	Global variables for use anywhere
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />


/** Breaking changes, 0 means development @type {number} */
const __MAJOR__ = 0;
/** Non-breaking new features @type {number} */
const __MINOR__ = 3;
/** Non-breaking bug fixes @type {number} */
const __PATCH__ = 0;
/** Stage in prerelease, either `dev`, or `'stable'` @type {'dev' | 'stable'} */
const __STAGE__ = 'stable';
/** Updates between versions in dev, in stable, set to `undefined` @type {number?} */
const __PRNUM__ = null;

/** Main version data, includes `major`, `minor`, and `patch` */
const __VERSION_CORE__ = `${__MAJOR__}.${__MINOR__}.${__PATCH__}`;
/** Prerelease data, includes prerelease stage and number */
const __PRERELEASE__ = `${__STAGE__}${__PRNUM__ !== null ? `.${__PRNUM__}` : ``}`;

/** Program version, current: `0.2.0-dev.1` */
const __VERSION__ = `${__VERSION_CORE__}-${__PRERELEASE__}`;

const LITTLE_G = 9.8;


const LEVELS = [
	{
		number: 1,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 2,
		name: "test wordwrap",
		completed: true,
		star: true,
		unlocked: true
	},
	{
		number: 3,
		name: "movement",
		completed: false,
		star: false,
		unlocked: false
	},
	{
		number: 4,
		name: "movement",
		completed: true,
		star: false,
		unlocked: true
	},
	{
		number: 5,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 6,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 7,
		name: "movement",
		completed: false,
		star: true,
		unlocked: true
	},
	{
		number: 8,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 9,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 10,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 11,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
	{
		number: 12,
		name: "movement",
		completed: false,
		star: false,
		unlocked: true
	},
];

/**
 * Enum of error names and IDs
 * @enum
 */
const ERROR_CODES = Object.freeze({
	MISSING_SCREEN:		0x00,
});

/**
 * Enum of error IDs and messages
 * @enum
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
	TITLE_CARD: 0o04,
	WIN: 0o05,
	ERROR: 0o06,
	TEST: 0o10,
});

/**
 * As of now unused
 */
const GAME_STAGES = Object.freeze({
	PAST: 0b0,
	PRESENT: 0b1,
});

/**
 * Flags for physics objects
 * Bit 0-5: Collision layers, two objects on different
 * 		collision layers will not collide
 * Bit 6: If you want the object to collide or just
 * 		trigger something
 * Bit 7: If you want the object to be affected by gravity
 * @example
 * // New static physics object with collision on layers 5 and 0
 * new StaticPhysObj(
 * 	someField,
 * 	PHYSICS_FLAGS.DO_COLLIDE | PHYSICS_FLAGS.LAYER_0 | PHYSICS_FLAGS.LAYER_5
 * );
 * @enum
 */
const PHYSICS_FLAGS = Object.freeze({
	// If the bit is set that means it will collide on that layer
	LAYER_0:	0b00_000001,
	LAYER_1:	0b00_000010,
	LAYER_2:	0b00_000100,
	LAYER_3:	0b00_001000,
	LAYER_4:	0b00_010000,
	LAYER_5:	0b00_100000,

	DO_COLLIDE:			0b01_000000,
	GRAVITY:			0b10_000000,
});

/**
 * Collision results
 * @enum
 */
const COLLISION = Object.freeze({
	NO_HIT:	0,
	FLOOR:	1,
	LEFT:	2,
	RIGHT:	3,
	OTHER:	4,
});