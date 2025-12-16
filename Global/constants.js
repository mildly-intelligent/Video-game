// Constants
// Noah D.
// 9-12-2025
// 11-12-2025
/*
	Global variables for use anywhere
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />


/** Breaking changes, 0 means development @type {number} */
const __MAJOR__ = 0;
/** Non-breaking new features @type {number} */
const __MINOR__ = 2;
/** Non-breaking bug fixes @type {number} */
const __PATCH__ = 0;
/** Stage in prerelease, either `dev`, or `'stable'` @type {'dev' | 'stable'} */
const __STAGE__ = 'dev';
/** Updates between versions in dev, in stable, set to `undefined` @type {number?} */
const __PRNUM__ = 2;

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

const ERROR_CODES = Object.freeze({
	MISSING_SCREEN:		0x00,
});

const ERROR_MESSAGES = Object.freeze({
	0x00: (...[[ID]]) => `No screen with ID: 0o${ID.toString(8).padStart(2, '0')}`,
});

const SCREEN_IDS = Object.freeze({
	CREDITS: 0o00,
	FAIL: 0o01,
	LEVEL_SELECT: 0o02,
	MAIN_MENU: 0o03,
	TITLE_CARD: 0o04,
	WIN: 0o05,
	ERROR: 0o06,
});

const GAME_STAGES = Object.freeze({
	PAST: 0b0,
	PRESENT: 0b1,
});

const PHYSICS_FLAGS = Object.freeze({
	// If the bit is set that means it will collide on that layer
	COLLISION_LAYER_0:	0b0000_0001,
	COLLISION_LAYER_1:	0b0000_0010,
	COLLISION_LAYER_2:	0b0000_0100,
	COLLISION_LAYER_3:	0b0000_1000,

	DO_COLLIDE:			0b0001_0000,
	STRICT_COLLIDE:		0b0010_0000,
	GRAVITY:			0b0100_0000,
	
	UNUSED:				0b1000_0000,
});

const COLLISION = Object.freeze({
	NO_HIT:	0,
	FLOOR:	1,
	LEFT:	2,
	RIGHT:	3,
	OTHER:	4,
});