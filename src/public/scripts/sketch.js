let multiverseFile, multiverse;

function preload() {
	const URL = "../../data/multiverseData.json";
	let data = loadJSON(URL, () => {
		multiverseFile = data;
		multiverse = new Multiverse(multiverseFile);
		multiverse.createTemplate(windowWidth, windowHeight / 1.2);
	});
}

function setup() {
	// Put Canva in Main Container
	let canva = createCanvas(windowWidth, windowHeight / 1.2);
	canva.id("canvasView");
	select("#mainView").child(canva);
}

function draw() {
	background(220);
	multiverse.draw();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight / 1.2);
}
