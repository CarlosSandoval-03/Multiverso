class Universe {
	static URL_RANDOM_IMAGES_SEARCH = "https://source.unsplash.com/random/";
	static URL_RANDOM_IMAGES_ERROR =
		"https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";

	static SIZE_NODE = 60;

	static NODE_COLOR = "#FFFFFF";
	static TEXT_NODE_COLOR = "#000000";
	static INVERSE_FONT_SIZE = 5;
	static STOKE_COLOR = "#000000";
	static STROKE_WEIGTH = 2;

	static STROKE_SELECTED_COLOR = "#FF0000";
	static STROKE_SELECTED_WEIGTH = "#FF0000";
	static NODE_SELECTED_COLOR = "rgba(0,255,0, 1)";
	static NODE_MAIN_SELECTED_COLOR = "#6600A1";
	static NODE_CLICKED_COLOR = "#FF8000";

	static draw = (xPos, yPos, name = "", color = Universe.NODE_COLOR) => {
		textAlign(CENTER, CENTER);
		fill(color);
		ellipse(xPos, yPos, Universe.SIZE_NODE, Universe.SIZE_NODE);
		fill(Universe.TEXT_NODE_COLOR);
		textSize(Universe.SIZE_NODE / Universe.INVERSE_FONT_SIZE);
		text(name, xPos, yPos);
	};

	constructor(name, { image, energyBarrier, numLinks }) {
		this.name = name;
		this.keyImage = image;
		this.energyBarrier = energyBarrier;
		this.numLinks = numLinks;

		// Representative Image
		this.urlImage = undefined;
		this.fetchRepresentativeImage();
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
				this.fetchRepresentativeImage();
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
				this.fetchRepresentativeImage();
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
}
