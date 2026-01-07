// Shape functions
// Noah D.
// 10-12-2025
// 10-12-2025
/*
	Custom shapes
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

// https://archive.p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function title(x, y, w, h) {
  styleText(fMonoton, ITALIC, 48, null, RIGHT);
  text("RETRO", x, y, w/2, h);
  styleText(fIconicIonic, BOLDITALIC, 52, null, LEFT);
  text("C  U  R  R  I  M  U  S", x+w/2, y-h/6, w/2, h);
}