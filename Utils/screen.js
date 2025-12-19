// 2025-12-16
/// <reference path="/home/aurora/.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/global.d.ts" />



class Scr {
	#setup;
	#draw;
	#tick;
	
	constructor(id, setup, draw, tick) {
		this.id = id;
		this.#setup = setup;
		this.#draw = draw;
		this.#tick = tick ?? (() => {});
	}

	setup() {
		this.#setup();
	}

	draw() {
		this.#draw();
		this.tick();
	}

	tick() {
		this.#tick();
		
	}

	register() {
		state.screens.push(this);
		return this;
	}
}