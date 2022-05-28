class Multiverse {
	static drawArrow = (
		init,
		end,
		color = Universe.STOKE_COLOR,
		weight = Universe.STOKE_WEIGHT
	) => {
		push();
		stroke(color);
		strokeWeight(weight);
		fill(color);
		translate(init.x, init.y);
		line(0, 0, end.x, end.y);
		rotate(end.heading());
		let arrowSize = 20;
		translate(end.mag() - arrowSize, 0);
		triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
		pop();
	};

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
			this.template[universe.name] = {
				x: xPos,
				y: yPos,
				connections: [],
				selected: false,
			};
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
			this.template[node.tag].x = node.xPos;
			this.template[node.tag].y = node.yPos;
		}
		this.connect();
	}

	connect() {
		for (let i in this.universes) {
			let universe = this.links[i];
			let universeName = this.universes[i].name;
			for (let j = 0; j < universe.length; j++) {
				if (this.links[i][j] == 1) {
					this.template[universeName].connections.push(this.universes[j].name);
				}
			}
		}
		console.table(this.template);
	}

	drawConnect(universe1, universe2) {
		let init = createVector(
			this.template[universe1].x,
			this.template[universe1].y
		);
		let end = createVector(
			this.template[universe2].x - init.x,
			this.template[universe2].y - init.y
		);

		if (dist(mouseX, mouseY, init.x, init.y) < Universe.SIZE_NODE / 2) {
			Multiverse.drawArrow(init, end, Universe.STROKE_SELECTED_COLOR, 3);
			this.template[universe1].selected = undefined;
			this.template[universe2].selected = true;
		} else {
			Multiverse.drawArrow(init, end, Universe.STOKE_COLOR, 1);
			setTimeout(() => {
				this.template[universe2].selected = false;
				this.template[universe1].selected = false;
			}, 100);
		}
	}

	draw() {
		for (let i in this.template) {
			let connections = this.template[i].connections;
			for (let connection of connections) {
				this.drawConnect(i, connection);
			}
		}
		for (let universe of this.universes) {
			let node = this.template[universe.name];

			if (node.selected == true) {
				Universe.draw(
					node.x,
					node.y,
					universe.name,
					Universe.NODE_SELECTED_COLOR
				);
			} else if (node.selected == false) {
				Universe.draw(node.x, node.y, universe.name);
			} else if (node.selected == undefined) {
				Universe.draw(
					node.x,
					node.y,
					universe.name,
					Universe.NODE_MAIN_SELECTED_COLOR
				);
			}
		}
	}
}
