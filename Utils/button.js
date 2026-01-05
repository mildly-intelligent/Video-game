// Button class
// Noah D.
// 4-12-2025
/*
	Class for easy button making.
*/
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />

/**
 * Function or image to render on Button.render()
 * @typedef {Image | () => void} Display
 */

class Button {
	/**
	 * @example
	 * 	var bPlay = new Button(
	 * 		0o03,
	 * 		() => {
	 * 			state.active = true;
	 * 		},
	 * 		"Play",
	 * 		{ font.size: 13, font.color = new Color('red') },
	 * 	);
	 * 
	 * 	function draw() {
	 * 		button(bPlay, width/2, height/2, width/4, height/4);
	 * 	}
	 * 
	 * @constructor
	 * @param {number} screen_id Screen the button is on
	 * @param {() => void} on_click Function to call when the button is clicked.
	 * @param {string?} txt Text to display above the image
	 * @param {Object} fnt Font of the text
	 * @param {Font} fnt.font String (non-WEBGL only) or Font object from `loadFont`
	 * @param {THE_STYLE} fnt.style NORMAL, ITALIC, BOLD or BOLDITALIC
	 * @param {number} fnt.size Font size (in pixels)
	 * @param {Color} fnt.col Color of the text
	 * @param {HORIZ_ALIGN} fnt.hAlign LEFT, CENTER, or RIGHT
	 * @param {VERT_ALIGN} fnt.vAlign TOP, BOTTOM, CENTER, or BASELINE
	 * @param {number} fnt.outline Thickness of the outline
	 * @param {Color} fnt.outlineCol Color of the outline
	 * @param {number} fnt.spacing Line spacing (in pixels)
	 * @param {Display?} default_disp Draw function or image when
	 * 		the button is in the default state.
	 * @param {Display?} hover_disp Draw function or image when the
	 * 		button is being hovered on.
	 * @param {Display?} held_disp Draw function or image when the
	 * 		button is being held down.
	 * @param {Display?} inactive_disp Draw function or image when the
	 * 		button is inactive.
	 */
	constructor(
		screen_id,
		on_click,
		txt,
		fnt,
		default_disp,
		hover_disp,
		held_disp,
		inactive_disp,
	) {
		this.screen_id = screen_id;
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
		this.disp0	= default_disp ?? this.disp0;
		this.disp1	= hover_disp ?? this.disp1;
		this.disp2	= held_disp ?? this.disp2;
		this.disp3	= inactive_disp ?? this.disp3;
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

	/** Optional text to draw over the image or function
	 * @private @property @type {string} */
	#txt = "";

	/** Optional text to draw over the image or function
	 * @private @property @type {Object} */
	#fnt = {
		font: 'Courier New',
		style: NORMAL,
		size: 12,
		col: color('black'),
		hAlign: CENTER, 
		vAlign: CENTER,
	};

	/** Whether the button is actively being clicked
	 * This is being handled outside of p5's builtin mousePressed function
	 * 	because it is easier for the `tick` function to be contained to just
	 * 	run every frame
	 * @private @property @type {bool} */
	#clicked = false;
	//#endregion
	//#region --- PRIVATE METHODS --- //
	/**
	 * Renders one of the 4 display modes
	 * @param {Display} display The display to render
	 * @private
	 */
	#renderSingleMode( display ) {
		// If it's a function, call it
		if (typeof(display) == "function") {
			display();
		// If it's an image, draw the image to G
		} else {
			image(display, this.x, this.y, this.w, this.h);
		}
		// Render the text.
		style(this.#fnt)
		text(this.#txt, this.x + this.w/2, this.y + this.h/2);
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

	/** Image to display or function to call when
	 * ```js
	 * this.#state == 0
	 * ```
	 * @property @type {Display} */
	disp0 = (G) => {
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
	 * @property @type {Display} */
	disp1 = () => {
		fill(230);
		rect(this.x, this.y, this.w, this.h);
	};
	
	/** Image to display or function to call when
	 * ```js
	 * this.#state == 2
	 * ```
	 * @property @type {Display} */
	disp2 = () => {
		let offset = height / 160;
		fill(0)
		rect(this.x, this.y, this.w+offset, this.h+offset)
		fill(230)
		rect(this.x+offset, this.y+offset, this.w, this.h);
	};

	/** Image to display or function to call when
	 * ```js
	 * this.#state == 3
	 * ```
	 * @property @type {Display} */
	disp3 = () => {
		fill(220);
		rect(this.x, this.y, this.w, this.h);
	};
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
			this.#state = Button.State.DEFAULT;
		} else {
			this.#state = Button.State.INACTIVE;
		}
	}

	/**
	 * Called every tick or frame of the sketch. It updates `this.#state`.
	 */
	tick() {
		// No need to do anything if we're on a different screen
		if (state.screen != this.screen_id) {
			return;
		}
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
	 */
	render() {
		let display;

		// Set display to the appropriate display for the state
		switch (this.#state) {
			case Button.State.DEFAULT:
				display = this.disp0;
				break;
			case Button.State.HOVER:
				display = this.disp1;
				break;
			case Button.State.HOLD:
				display = this.disp2;
				break;
			case Button.State.INACTIVE:
				display = this.disp3;
				break;
			default:
				break;
		}

		// Render the object
		this.#renderSingleMode(display);
	}
	//#endregion

	/**
	 * Adds the button to state
	 * Returns the button so one can define the button and add it to register in one line
	 * @example
	 * bQuit = new Button(
	 * 	... 
	 * ).register();
	 * @returns {Button}
	 */
	register() {
		// Add the button to the state
		state.register.buttons.push(this);
	}
	//#endregion
}

/**
 * Draws a specified button object with set dimensions.
 * @param {Button} btn Button object to draw
 * @param {number} x Top left corner of the button
 * @param {number} y Top left corner of the button
 * @param {number} w Width of the button
 * @param {number} h Height of the button
 */
function button(btn, x, y, w, h) {
	// Set the coordinates of the button
	btn.x = x;
	btn.y = y;
	btn.w = w;
	btn.h = h;
}