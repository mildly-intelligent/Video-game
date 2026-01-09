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
const __MINOR__ = 4;
/** Non-breaking bug fixes @type {number} */
const __PATCH__ = 4;
/** Stage in prerelease, either `dev`, or `'stable'` @type {'dev' | 'stable'} */
const __STAGE__ = 'stable';
/** Updates between versions in dev, in stable, set to `undefined` @type {number?} */
const __PRNUM__ = null;

/** Main version data, includes `major`, `minor`, and `patch` */
const __VERSION_CORE__ = `${__MAJOR__}.${__MINOR__}.${__PATCH__}`;
/** Prerelease data, includes prerelease stage and number */
const __PRERELEASE__ = `${__STAGE__}${__PRNUM__ !== null ? `.${__PRNUM__}` : ``}`;

/** Program version */
const __VERSION__ = `${__VERSION_CORE__}-${__PRERELEASE__}`;

// The acceleration due to gravity is split into the speed slowing you down when you move up, and the
//	the speed speeding you up when you move down. I learned this trick from @InboundShovel on YouTube.
// The purpose of this is to improve the feel and handling of the game.
const GRAVITY_DOWN = 150;
const GRAVITY_UP = 100;

// This is multiplied by the speed every frame to slow the player down on the floor
const FRICTION = 0.6;
const AIR_RESISTANCE = 0.95;

const PLAYER_ACC = 2.5;
const PLAYER_MAX_SPEED = 50.0;


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

// Output of `_PhysicsObject.
const COLLISION = Object.freeze({
	NONE:	0,
	OTHER:	1,
	TOP:	2,
})