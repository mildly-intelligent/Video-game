// Constants
// Noah D.
// 9-12-2025
// 10-12-2025
/*
	Global variables for use anywhere
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

const __MAJOR__ = 0;
const __MINOR__ = 2;
const __PATCH__ = 0;
// 0.1.0
const __VERSION__ = `${__MAJOR__}.${__MINOR__}.${__PATCH__}`

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
	ERROR: 0o06
});