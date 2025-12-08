// Button class
// Noah D.
// 4/12/2025
// 4/12/2025
/*
	DESCRIPTION
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

class Button {
	/**
	 * @constructor
	 * @param {() => void} on_click Function to call when the button is clicked.
	 * @param {string?} txt Text to display above the image
	 * @param {(string | Font)?} fnt Font for the text 
	 * @param {(((G: Graphics?) => void) | Image)?} default_disp Draw function or image when
	 * 		the button is in the default state.
	 * @param {(((G: Graphics?) => void) | Image)?} hover_disp Draw function or image when the
	 * 		button is being hovered on.
	 * @param {(((G: Graphics?) => void) | Image)?} held_disp Draw function or image when the
	 * 		button is being held down.
	 * @param {(((G: Graphics?) => void) | Image)?} inactive_disp Draw function or image when the
	 * 		button is inactive.
	 */
	constructor(
		on_click,
		txt,
		fnt,
		default_disp,
		hover_disp,
		held_disp,
		inactive_disp,
	) {
		this.#on_click = on_click;
		/*
		The null coalescing operator (??) is used
		because we want to change #disp0 (and the
		other values) if there is a new value but
		keep the old one if the parameter is not
		set.
		*/
		this.#txt	= txt ?? this.#txt;
		this.#fnt	= fnt ?? this.#fnt;
		this.#disp0	= default_disp ?? this.#disp0;
		this.#disp1	= hover_disp ?? this.#disp1;
		this.#disp2	= held_disp ?? this.#disp2;
		this.#disp3	= inactive_disp ?? this.#disp3;
	}
	
	//#region === STATIC MEMBERS === //
	//#region --- STATIC PROPERTIES --- //
	/**
	 * Enum for the state of the button
	 * @static
	 * @readonly
	 * @enum {number}
	*/
	static State = Object.freeze({
		DEFAULT : 0,	// Mouse not pressing or on button
		HOVER : 1,		// Mouse is hovering on button
		HOLD : 2,		// Mouse is being clicked
		INACTIVE : 3,	// Button is not pressable
	});
	//#endregion
	//#endregion
	
	
	//#region === PRIVATE MEMBERS === //
	//#region --- PRIVATE PROPERTIES --- //
	/** Function to call when the button is clicked
	 * @private @property @type {() => void)} */
	#on_click = function() { };
	
	/** State of the button
	 * @private @property @type {number} */
	#state = Button.State.DEFAULT;
	/** @type {number} */
	get state() {
		return this.#state;
	}
	
	/** Image to display or function to call when
	 * ```js
	 * this.#state == 0
	 * ```
	 * @private @property @type {(Image | ((G: Graphics) => void))?} */
	#disp0 = (G) => {
		if (G === undefined) {
			fill(255);
			rect(this.x, this.y, this.w, this.h);
		} else {
			G
			.fill(225)
			.rect(this.x, this.y, this.w, this.h);
		}
	};
	
	/** Image to display or function to call when
	 * ```js
	 * this.#state == 1
	 * ```
	 * @private @property @type {(Image | (G: Graphics?) => void)?} */
	#disp1 = (G) => {
		if (G === undefined) {
			fill(230);
			rect(this.x, this.y, this.w, this.h);
		} else {
			G
			.fill(230)
			.rect(this.x, this.y, this.w, this.h);
		}
	};
	
	/** Image to display or function to call when
	 * ```js
	 * this.#state == 2
	 * ```
	 * @private @property @type {(Image | (G: Graphics?) => void)?} */
	#disp2 = (G) => {
		let offset = height / 160;
		if (G === undefined) { 
			fill(0)
			rect(this.x, this.y, this.w+offset, this.h+offset)
			fill(230)
			rect(this.x+offset, this.y+offset, this.w, this.h);
		} else {
			G
			.fill(0)
			.rect(this.x, this.y, this.w+offset, this.h+offset)
			.fill(230)
			.rect(this.x+offset, this.y+offset, this.w, this.h);
		}
	};

	/** Image to display or function to call when
	 * ```js
	 * this.#state == 3
	 * ```
	 * @private @property @type {(Image | (G: Graphics?) => void)?} */
	#disp3 = (G) => {
		if (G === undefined) {
			fill(220);
			rect(this.x, this.y, this.w, this.h);
		} else {
			G
			.fill(220)
			.rect(this.x, this.y, this.w, this.h);
		}
	};

	/** Optional text to draw over the image or function
	 * @private @property @type {string} */
	#txt = "";

	/** Optional text to draw over the image or function
	 * @private @property @type {(string | Font)} */
	#fnt = "Courier New";

	/** Whether the button is actively being clicked
	 * @private @property @type {bool} */
	#clicked = false;
	//#endregion
	//#region --- PRIVATE METHODS --- //
	/**
	 * Renders one of the 4 display modes
	 * @param {(((G: Graphics?) => void) | Image)} display The display to render
	 * @param {Graphics?} G Graphics object to display to
	 * @private
	 */
	#renderSingleMode( display, G ) {
		if (G === undefined) {
			textAlign(CENTER, CENTER);
			// If it's a function, call it
			if (typeof(display) == "function") {
				display();
			// If it's an image, draw the image to G
			} else {
				image(display, this.x, this.y, this.w, this.h);
			}
			// Render the text.
			fill(0);
			textFont(this.#fnt);
			text(this.#txt, this.x + this.w/2, this.y + this.h/2);
		} else {
			G
			.textAlign(CENTER, CENTER);
			if (typeof(display) == "function") {
				// If it's a function, call it on G
				display(G);
			} else {
				// If it's an image, draw the image
				G
				.image(display, this.x, this.y, this.w, this.h);
			}
			// Render the text.
			G
			.fill(0)
			.textFont(this.#fnt)
			.text(this.#txt, this.x + this.w/2, this.y + this.h/2);
		}
	}
	//#endregion
	//#endregion


	//#region === PUBLIC MEMBERS === //
	//#region --- PUBLIC PROPERTIES --- //
	/** The x coordinate of the top left corner
	 * @property @type {number} */
	x = 0;
	
	/** The y coordinate of the top left corner
	 * @property @type {number} */
	y = 0;
	
	/** The width of the button
	 * @property @type {number} */
	w = 100;
	
	/** The height of the button
	 * @property @type {number} */
	h = 100;
	//#endregion

	//#region --- PUBLIC METHODS --- //
	/**
	 * Whether the button is clickable or not 
	 * @type {bool}
	 */
	get active() {
		return this.#state != Button.State.INACTIVE;
	}
	set active(value) {
		if (value) {
			this.#state = Button.State.INACTIVE;
		} else {
			this.#state = Button.State.DEFAULT;
		}
	}

	/**
	 * Called every tick or frame of the sketch. It updates `this.#state`.
	 */
	tick() {
		// No processing needed if the button is inactive.
		if (this.#state == Button.State.INACTIVE) {
			return;
		}

		// Create aliases for longer variable names for readability
		let x = this.x;
		let y = this.y;
		let w = this.w;
		let h = this.h;
		let mx = mouseX;
		let my = mouseY;

		// If mouse is inside the button
		if ((x <= mx && mx <= x+w) && (y <= my && my <= y+h)) {
			// If the mouse isn't clicked but was last tick
			if (!mouseIsPressed && this.#clicked) {
				this.#on_click()
			}

			if (mouseIsPressed) {
				this.#state = Button.State.HOLD;
				this.#clicked = true;
			} else {
				this.#state = Button.State.HOVER;
				this.#clicked = false;
			}
		} else {
			this.#state = Button.State.DEFAULT;
			this.#clicked = false;
		}
	}

	/**
	 * Renders the button, either calls the appropriate
	 * draw function or draws the image.
	 * @param {Graphics?} G Graphics object to draw to.
	 * @param {bool?} doTick Whether to call `this.tick` in the render or if it is called elsewhere.
	 */
	render( G, doTick= true ) {
		if (doTick) {
			this.tick();
		}

		let display;

		// Set display to the appropriate display for the state
		switch (this.#state) {
			case Button.State.DEFAULT:
				display = this.#disp0;
				break;
			case Button.State.HOVER:
				display = this.#disp1;
				break;
			case Button.State.HOLD:
				display = this.#disp2;
				break;
			case Button.State.INACTIVE:
				display = this.#disp3;
				break;
			default:
				break;
		}

		// Render the object
		this.#renderSingleMode(display, G);
	}
	//#endregion
	//#endregion
}

/**
 * Draws a specified button object with set dimensions.
 * @param {Button} btn Button object to draw
 * @param {number} x Top left corner of the button
 * @param {number} y Top left corner of the button
 * @param {number} w Width of the button
 * @param {number} h Height of the button
 * @param {Graphics?} G Graphics object to draw to
 */
function button(btn, x, y, w, h, G) {
	// Set the coordinates of the button
	btn.x = x;
	btn.y = y;
	btn.w = w;
	btn.h = h;
	// Render the button
	btn.render(G);
}