// Error function
// Noah D.
// 10-12-2025
/*
	ScreenID: 06
	Screen to display when something goes
	wrong
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

/**
 * Error screen
 * Because this screen takes arguments, it will not have a screen object
 * @param {number} errCode 
 * @param  {...any} details 
 */
function draw_error( errCode, ...details ) {
	background('#ff00ff');
	style(null, BOLDITALIC, 36, null, CENTER, CENTER);
	text("ERROR", width/2, height/2);
	// Get error message
	let txt = ERROR_MESSAGES[errCode](details);
	textSize(12);
	text(txt, width/2, height*2/3);
}