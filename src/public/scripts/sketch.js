let multiverseFile,
	multiverse,
	count = 1,
	stateFocus = true;

function preload() {
	const URL = "src/data/multiverseData.json";
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
	multiverse.draw(stateFocus);

	if (mouseIsPressed === true || count > 0) {
		let info = document.getElementById("info-universe");
		info.innerHTML = `Universo: ${multiverse.selectedUniverse.name}`;
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight / 1.2);
}

function debugPrints() {
	// Debug
	console.table(multiverse.template);
	console.table(multiverse.universes);
	console.table(multiverse.links);
	console.log(multiverse.selectedUniverse);
}
