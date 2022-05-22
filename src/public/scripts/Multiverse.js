class Multiverse {
	constructor(jsonData) {
		this.universes = [];
		this.links = jsonData["links"];

		this.createMultiverse(jsonData["data"]);
	}

	createMultiverse(object) {
		for (const key in object) {
			let universe = new Universe(key, object[key]);
			this.universes.push(universe);
		}
	}

	draw() {
		for (let universe of this.universes) {
			universe.draw();
		}
	}
}
