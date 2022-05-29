class Multiverse {
	/** Reference: https://p5js.org/es/reference/#/p5.Vector/heading */
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

		this.selectedUniverse = this.universes[0];
		this.creatorMode = false;
	}

	createMultiverse(object) {
		for (const key in object) {
			let universe = new Universe(key, object[key]);
			this.universes.push(universe);
		}
	}

	createTemplate(width, height) {
		for (let universe of this.universes) {
			this.template[universe.name] = {
				x: undefined,
				y: undefined,
				connections: [],
				selected: false,
			};
		}
		this.generateGraph(width, height);
	}

	addUniverse(universeData, width, height) {
		for (let universe in this.template) {
			if (universeData.name == universe) {
				alert("El nombre del nuevo universo ya existe");
				return true;
			}
		}

		let info = {
			image: universeData.image,
			energyBarrier: universeData.energyBarrier,
			numLinks: universeData.numLinks,
		};
		let universe = new Universe(universeData.name, info);

		this.universes.push(universe);
		this.template[universe.name] = {
			x: random(Universe.SIZE_NODE, width - Universe.SIZE_NODE),
			y: random(Universe.SIZE_NODE, height - Universe.SIZE_NODE),
			connections: [],
			selected: true,
		};

		let lastUniverse = [];
		let newLinks = [];
		for (let i = 0; i < this.links.length; i++) {
			this.links[i].push(0);
			lastUniverse.push(0);
			newLinks.push(this.links[i]);
		}
		lastUniverse.push(0);
		newLinks.push(lastUniverse);
		this.links = newLinks;

		this.selectedUniverse = this.universes[this.universes.length - 1];
		return true;
	}

	removeUniverse(universeData = this.selectedUniverse) {
		let pos = 0;
		for (let universe of this.universes) {
			if (universe.name == universeData.name) {
				break;
			}
			pos++;
		}

		let newLinks = [];
		for (let i = 0; i < this.links.length; i++) {
			if (i == pos) {
				continue;
			}

			let row = [];
			for (let j = 0; j < this.links[i].length; j++) {
				if (j != pos) {
					row.push(this.links[i][j]);
				}
			}
			newLinks.push(row);
		}

		this.links = newLinks;
		delete this.template[this.universes[pos].name];

		let newArrayOfUniverses = [];
		for (let i = 0; i < this.universes.length; i++) {
			if (pos != i) {
				newArrayOfUniverses.push(this.universes[i]);
			}
		}

		this.universes = newArrayOfUniverses;
		this.selectedUniverse = this.universes[0];
		this.connect();
	}

	/**
	 * Reference: https://discourse.processing.org/t/how-to-add-text-inside-circle-or-any-other-shapes-in-p5-js/20092
	 * User: Yom - Processing Foundation
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
			this.template[universeName].connections = [];

			for (let j = 0; j < universe.length; j++) {
				if (this.links[i][j] == 1) {
					this.template[universeName].connections.push(this.universes[j].name);
				}
			}

			this.universes[i].numLinks =
				this.template[universeName].connections.length;
		}
	}

	selectUniverse() {
		for (let universe in this.template) {
			let node = createVector(
				this.template[universe].x,
				this.template[universe].y
			);

			if (dist(mouseX, mouseY, node.x, node.y) < Universe.SIZE_NODE / 2) {
				this.template[universe].selected = undefined;

				if (mouseIsPressed === true) {
					for (let universeTemp of this.universes) {
						if (universeTemp.name === universe) {
							this.selectedUniverse = universeTemp;
						}
					}
				}
			} else {
				setTimeout(() => {
					this.template[universe].selected = false;
				}, 200);
			}
		}
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
			this.template[universe2].selected = true;
		} else {
			Multiverse.drawArrow(init, end, Universe.STOKE_COLOR, 1);
			setTimeout(() => {
				this.template[universe2].selected = false;
			}, 100);
		}
	}

	draw(stateCanvas) {
		if (stateCanvas) {
			this.selectUniverse();

			for (let i in this.template) {
				let connections = this.template[i].connections;
				for (let connection of connections) {
					this.drawConnect(i, connection);
				}
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
