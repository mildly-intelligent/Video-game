/**
 * Draws a star
 * 
 * Credit to: https://archive.p5js.org/examples/form-star.html
 * Slightly modified from source
 * @param {number} x X coordinate of the center of the star
 * @param {number} y Y coordinate of the center of the star
 * @param {number} radius1 Inner radius of the star
 * @param {number} radius2 Outer radius of the star
 * @param {number?} npoints Number of points for the star to have
 * @param {number?} phase Rotation of the star
 */
function star(x, y, radius1, radius2, npoints= 5, phase= 0) {
	let angle = TWO_PI / npoints;
	let halfAngle = angle / 2.0;
	beginShape();
	for (let a = 0; a < TWO_PI; a += angle) {
		let sx = x + cos(a + phase) * radius2;
		let sy = y + sin(a + phase) * radius2;
		vertex(sx, sy);
		sx = x + cos(a + halfAngle + phase) * radius1;
		sy = y + sin(a + halfAngle + phase) * radius1;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}

/**
 * Draws the title at size
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 */
function title(x, y, w, h) {
	style_text(fMonoton, ITALIC, 48, null, RIGHT, CENTER);
	text("RETRO", x, y, w/2, h);
	style_text(fIconicIonic, ITALIC, 52, null, LEFT, CENTER);
	text("C  U  R  R  I  M  U  S", x+w/2, y-h/6, w/2, h);
}