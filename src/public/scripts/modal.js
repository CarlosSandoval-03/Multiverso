const createWindow = document.getElementById("create-window");
const readWindow = document.getElementById("read-window");

const openReadWindow = (universe = multiverse.selectedUniverse) => {
	const img = document.getElementById("universe-photo");
	img.src = universe.urlImage.url;

	const info = document.getElementById("p-universe");
	info.innerHTML = `Universo: ${universe.name}<br />Nombre: ${universe.keyImage}<br />Barrera Energetica: ${universe.energyBarrier}<br />Numero de Conexiones: ${universe.numLinks}`;

	readWindow.showModal();
};

const closeReadWindow = () => {
	readWindow.close();
};

const openCreateWindow = () => {
	const form = document.querySelector("form");
	form.reset();

	createWindow.showModal();
};

const readInputs = () => {
	const inputs = document.querySelectorAll("input");

	let baseString = "";
	let energy = 0;

	for (let i = 0; i < inputs.length; i++) {
		if (i == 2) {
			baseString += "-";
		}
		if (i == 0 || i == 2) {
			if (inputs[i].value == "0") {
				continue;
			}
		}
		baseString += inputs[i].value;
	}

	return [baseString, energy];
};

const createUniverse = () => {
	let infoNewUniverse = readInputs();
	let newUniverse = {
		name: infoNewUniverse[0],
		image: "",
		energyBarrier: infoNewUniverse[1],
		numLinks: 0,
	};
	let error = multiverse.addUniverse(
		newUniverse,
		windowWidth,
		windowHeight / 1.2
	);
	if (error) {
		closeCreateWindow();
	}
};

const closeCreateWindow = () => {
	const form = document.querySelector("form");
	form.reset();
	createWindow.close();
};
