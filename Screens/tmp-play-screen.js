// Temporary play screen
// Noah D.
// 01-05-26
/*
	ScreenID: 77
	Temporary screen to go to either win or lose screen.
*/

var bWin77;
var bLose77;
function setup77() {
	bWin77 = new Button(
		() => { state.screen = SCREEN_IDS.WIN },
		"win"
	);
	bLose77 = new Button(
		() => { state.screen = SCREEN_IDS.FAIL },
		"lose"
	);
}

function draw77() {
	background(220);
	var tmp = new TextStyle(null, BOLD, 32, null, CENTER, CENTER);
	style(tmp);
	text("TEMPORARY GAME SCREEN", width/2, height/8);

	button(bWin77, width*3/16, height/2, width/4, height/6);
	button(bLose77, width*9/16, height/2, width/4, height/6);
}