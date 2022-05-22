class Universe {
	static URL_RANDOM_IMAGES_SEARCH = "https://source.unsplash.com/random/";
	static URL_RANDOM_IMAGES_ERROR =
		"https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";

	static SIZE_NODE = 60;

	static NODE_COLOR = "#FFFFFF";
	static TEXT_NODE_COLOR = "#000000";
	static INVERSE_FONT_SIZE = 5;

	constructor(name, { image, energyBarrier, numLinks }) {
		this.name = name;
		this.keyImage = image;
		this.energyBarrier = energyBarrier;
		this.numLinks = numLinks;

		// Representative Image
		this.urlImage = undefined;
		this.image = undefined;

		// Random Position
		// this.xPos = Math.floor(Math.random() * windowWidth) + 1;
		// this.yPos = Math.floor(Math.random() * (windowHeight / 1.3)) + 1;
	}

	// Random image from keyword
	fetchRepresentativeImage() {
		let keyword = this.keyImage.substr(0, 2);

		fetch(`${Universe.URL_RANDOM_IMAGES_SEARCH}?${keyword}`)
			.then((Url) => {
				if (Url == Universe.URL_RANDOM_IMAGES_ERROR) {
					this.fecthRandomImage();
				} else {
					this.urlImage = Url;
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	// Random image
	fecthRandomImage() {
		fetch(Universe.URL_RANDOM_IMAGES_SEARCH)
			.then((Url) => {
				this.urlImage = Url;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	// P5 Load Sprite
	loadImage() {
		loadImage(this.urlImage)
			.then((img) => {
				this.image = img;
			})
			.catch((error) => {
				console.error(`NOT IMAGE LOADED: ${error}`);
			});
	}

	draw(xPos, yPos) {
		textAlign(CENTER, CENTER);
		fill(Universe.NODE_COLOR);
		ellipse(xPos, yPos, Universe.SIZE_NODE, Universe.SIZE_NODE);
		fill(Universe.TEXT_NODE_COLOR);
		textSize(Universe.SIZE_NODE / Universe.INVERSE_FONT_SIZE);
		text(this.name, xPos, yPos);
	}
}
