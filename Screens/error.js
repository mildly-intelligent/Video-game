/**
 * Error screen
 * Because this screen takes arguments, it will not have a screen object
 * @param {number} errCode 
 * @param  {...any} details 
 * @deprecated
 */
function draw_error( errCode, ...details ) {
	background('#ff00ff');
	style_text(null, BOLDITALIC, 36, null, CENTER, CENTER);
	text("ERROR", width/2, height/2);
	// Get error message
	let txt = ERROR_MESSAGES[errCode](details);
	textSize(12);
	text(txt, width/2, height*2/3);
}