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
 * @param {number} errCode 
 * @param  {...any} details 
 */
function draw06( errCode, ...details ) {
	background('#ff00ff');
	let sErrTxt = new TextStyle(null, BOLDITALIC, 36, null, CENTER, CENTER);
	style(sErrTxt);
	text("ERROR", width/2, height/2);
	// Get error message
	let txt = ERROR_MESSAGES[errCode](details);
	textSize(12);
	text(txt, width/2, height*2/3);
}