// Credits function
// Noah D.
// 9-12-2025
// 10-12-2025
/*
	ScreenID: 00
	Function to draw the credits
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

/**
	An object representing the credits.
	The keys represent categories, the value,
	if null means the end, if not is an object
	where the keys are the name of a role and
	the value is a list of names.
*/
const creditsText = {
	"Sample Category": {
		"Role 1": [
			"Person 1",
			"Person 2",
			"Person 3",
		],
		"Role 2": ["Person 4"],
	},
	"Other Category": {
		"Role 3": ["Person 5"],
	},
	"Final message": null,
};

/** The amount scrolled */
var scrollAmt00 = 0;
function draw00() {
	fill(0);
	background(220);
	// Scroll the text by the amount
	translate(0, -scrollAmt00);

	/** Place to draw the current text block */
	let scrollHeight = 0;
	// Loop through the categories
	for (let [category, roles] of Object.entries(creditsText)) {
		textAlign(CENTER, CENTER);
		textSize(24);
		/*
			If the role is null end the loop
			I have no idea why this works, I was
			doing random things and for some
			reason it worked
		*/
		if (roles === null) {
			scrollHeight += 75;
			text(category, width/4, scrollHeight, width/2, height);
			break;
		}
		scrollHeight += 75;
		// Category name
		text(category, width/4, scrollHeight, width/2, 75);
		scrollHeight += 10;
		// Loop through the roles
		for (let [role, names] of Object.entries(roles)) {
			scrollHeight += 25;
			textSize(14);
			textAlign(LEFT, CENTER);
			textStyle(BOLD);
			// Role name
			text(role, width/4, scrollHeight, width/2, 75);
			textStyle(NORMAL);
			// Loop through names
			for (let i=0; i < names.length; i++) {
				if (i != 0) scrollHeight += 25;
				textAlign(RIGHT, CENTER)
				// Name
				text(names[i], width/4, scrollHeight, width/2, 75);
			}
		}
	}
	// If past the whole text block
	if (scrollAmt00 >= scrollHeight) {
		/* Go back to main menu */		
	} else {
		// Use `deltaTime` so the text is smooth no matter the framerate
		scrollAmt00 += deltaTime/20;
	}
}