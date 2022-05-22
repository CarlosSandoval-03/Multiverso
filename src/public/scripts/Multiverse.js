class Multiverse {
	constructor(jsonData) {
		this.universes = [];
		this.links = jsonData["links"];

		this.createMultiverse(jsonData["data"]);

		this.template = {};
	}

	createMultiverse(object) {
		for (const key in object) {
			let universe = new Universe(key, object[key]);
			this.universes.push(universe);
		}
	}

	createTemplate(width, height) {
		for (let universe of this.universes) {
			let xPos, yPos;
			this.template[universe.name] = { x: xPos, y: yPos };
		}
		this.generateGraph(width, height);
	}

	/**
	 * Reference: https://discourse.processing.org/t/how-to-add-text-inside-circle-or-any-other-shapes-in-p5-js/20092
	 * User: Yom - Processin Foundation
	 */
	generateGraph(width, height) {
		let nodes = [];

		let i = 0;
		while (i < this.universes.length) {
			let nodeProperties = {
				xPos: random(Universe.SIZE_NODE, width - Universe.SIZE_NODE),
				yPos: random(Universe.SIZE_NODE, height - Universe.SIZE_NODE),
				tag: this.universes[i].name,
			};
			let isValidPosition = true;

			for (let k = 0; k < nodes.length; k++) {
				let actualNode = nodes[k];
				let distance = dist(
					nodeProperties.x,
					nodeProperties.y,
					actualNode.x,
					actualNode.y
				);

				if (distance < Universe.SIZE_NODE) {
					isValidPosition = false;
					break;
				}
			}

			if (isValidPosition) {
				nodes.push(nodeProperties);
			}

			i++;
		}

		this.buildGraph(nodes);
	}

	buildGraph(nodes) {
		for (let node of nodes) {
			this.template[node.tag] = { x: node.xPos, y: node.yPos };
		}
		console.table(this.template);
	}

	draw() {
		for (let universe of this.universes) {
			let pos = this.template[universe.name];
			universe.draw(pos.x, pos.y);
		}
	}
}
