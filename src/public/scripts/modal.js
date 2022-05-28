const createWindow = document.getElementById("create-window");
const readWindow = document.getElementById("read-window");

/** CREATE */
const openCreateWindow = () => {
	const form = document.querySelector("form");
	form.reset();

	createWindow.showModal();
};

const readInputs = () => {
	const inputs = document.querySelectorAll("input");

	let baseString = "";
	let numberConversion = "";
	let energy = 0;

	for (let i = 0; i < inputs.length; i++) {
		if (i == 2) {
			baseString += "-";
			energy += Number(numberConversion);
			numberConversion = "";
		}
		if (i == 0 || i == 2) {
			if (inputs[i].value == "0") {
				continue;
			}
		}
		numberConversion += inputs[i].value;
		baseString += inputs[i].value;
	}
	energy += Number(numberConversion);
	numberConversion = undefined;
	return [baseString, energy];
};

const createUniverse = () => {
	let infoNewUniverse = readInputs();

	if (infoNewUniverse[0] == "-") {
		closeCreateWindow();
		alert("Por favor registre un valor valido");
		return;
	}

	let fiboNumbers = infoNewUniverse[0].split("-");

	let newUniverse = {
		name: infoNewUniverse[0],
		image: randomStringFromUniverse(fiboNumbers[0], fiboNumbers[1]),
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

/** READ */
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

/** UPDATE */

/** DELETE */
