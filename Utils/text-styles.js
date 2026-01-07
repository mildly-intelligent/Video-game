// Text styles
// Noah D.
// 9-12-2025
/*
	DESCRIPTION
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

/**
 * Combines all text styling functions into one
 * @example
 * style(
 * 	'Times New Roman',
 * 	BOLD,
 * 	24,
 * 	color(205, 214, 244),
 * 	CENTER, CENTER,
 * 	3,
 * 	color(243, 139, 168),
 * 	12
 * );
 * 
 * text(...);
 * 
 * @example
 * style(someStylingObject);
 * text(...);
 * 
 * @param {Font | Object} fontOrObject String (non-WEBGL only) or Font object from `loadFont` or object containing styling information
 * @param {THE_STYLE} style NORMAL, ITALIC, BOLD or BOLDITALIC
 * @param {number} size Font size (in pixels)
 * @param {Color} col Color of the text
 * @param {HORIZ_ALIGN} hAlign LEFT, CENTER, or RIGHT
 * @param {VERT_ALIGN} vAlign TOP, BOTTOM, CENTER, or BASELINE
 * @param {number} outline Thickness of the outline
 * @param {Color} outlineCol Color of the outline
 * @param {number} spacing Line spacing (in pixels)
*/
function styleText (
	fontOrObject,
	style,
	size,
	col,
	hAlign,
	vAlign,
	outline,
	outlineCol,
	spacing,
) {
	if (arguments.length === 1) {
		// Create alias for `fontOrObject`
		let obj = fontOrObject;
		
		textAlign(obj.hAlign, obj.vAlign);
		if (obj.font !== null) textFont(obj.font);
		if (obj.spacing !== null) textLeading(obj.spacing);
		textSize(obj.size);
		if (obj.style !== null) textStyle(obj.style);
		if (obj.col !== null) fill(obj.col);
		if (obj.outlineCol !== null) stroke(obj.outlineCol);
		if (obj.outline !== null) strokeWeight(obj.outline);
	} else {
		textAlign(hAlign, vAlign);
		if (fontOrObject !== null) textFont(fontOrObject);
		if (spacing !== null) textLeading(spacing);
		textSize(size);
		if (style !== null) textStyle(style);
		if (col !== null) fill(col);
		if (outlineCol !== null) stroke(outlineCol);
		if (outline !== null) strokeWeight(outline);
	}
}