class Universe {
	static URL_RANDOM_IMAGES_SEARCH = "https://source.unsplash.com/random/";
	static URL_RANDOM_IMAGES_ERROR =
		"https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";

	static SIZE_NODE = 60;

	constructor(name, { image, energyBarrier, numLinks }) {
		this.name = name;
		this.keyImage = image;
		this.energyBarrier = energyBarrier;
		this.numLinks = numLinks;

		this.image = undefined;
		this.getImage();

		this.xPos = Math.floor(Math.random() * windowWidth) + 1;
		this.yPos = Math.floor(Math.random() * (windowHeight / 1.3)) + 1;
	}

	// Temporal Attemp
	getImage(random = false) {
		if (!random) {
			fetch(`${Universe.URL_RANDOM_IMAGES_SEARCH}?${this.keyImage}`).then(
				(res) => {
					if (res["url"] == Universe.URL_RANDOM_IMAGES_ERROR) {
						this.getImage(true);
					} else {
						this.image = res["url"];
					}
				}
			);
		} else {
			fetch(
				`${Universe.URL_RANDOM_IMAGES_SEARCH}?${this.keyImage.substr(0, 2)}`
			).then((res) => {
				this.image = res["url"];
				console.log(res["url"]);
			});
		}
	}

	draw() {
		circle(this.xPos, this.yPos, Universe.SIZE_NODE);
	}
}
