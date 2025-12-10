// Text styles
// Noah D.
// 9/12/2025
// 9/12/2025
/*
	DESCRIPTION
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

class TextStyle {
	/**
	 * @param {Font} font String (non-WEBGL only) or Font object from `loadFont`
	 * @param {THE_STYLE} style NORMAL, ITALIC, BOLD or BOLDITALIC
	 * @param {number} size Font size (in pixels)
	 * @param {Color} col Color of the text
	 * @param {HORIZ_ALIGN} hAlign LEFT, CENTER, or RIGHT
	 * @param {VERT_ALIGN} vAlign TOP, BOTTOM, CENTER, or BASELINE
	 * @param {number} outline Thickness of the outline
	 * @param {Color} outlineCol Color of the outline
	 * @param {number} spacing Line spacing (in pixels)
	 * @constructor
	 */
	constructor(
		font,
		style,
		size,
		col,
		hAlign,
		vAlign,
		outline,
		outlineCol,
		spacing
	) {
		this.font = font;
		this.style = style;
		this.size = size;
		this.col = col;
		this.hAlign = hAlign;
		this.vAlign = vAlign;
		this.outline = outline;
		this.outlineCol = outlineCol;
		this.spacing = spacing;
	}
}

/**
 * Styles text in one function
 * @param {TextStyle} opt TextStyle object
 * @example
 * 
 * 	var tmpStyle = new TextStyle(
 * 		'Times New Roman',
 * 		BOLD,
 * 		24,
 * 		color(205, 214, 244),
 * 		CENTER, CENTER,
 * 		3,
 * 		color(243, 139, 168),
 * 		12
 * 	);
 * 	
 * 	style(tmpStyle);
 * 	text("Hello, world!", width/2, height/2);
 */
function style(opt) {
	textAlign(opt.hAlign, opt.vAlign);
	if (opt.font != null) textFont(opt.font);
	if (opt.spacing != null) textLeading(opt.spacing);
	textSize(opt.size);
	if (opt.style != null) textStyle(opt.style);
	if (opt.col != null) fill(opt.col);
	if (opt.outlineCol != null) stroke(opt.outlineCol);
	if (opt.outline != null) strokeWeight(opt.outline);
}