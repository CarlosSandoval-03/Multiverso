const createWindow = document.getElementById("create-window");
const readWindow = document.getElementById("read-window");
const updateWindow = document.getElementById("update-window");

/** CREATE */
const openCreateWindow = () => {
	const form = document.querySelector("#form-create");
	form.reset();

	stateFocus = false;
	createWindow.showModal();
};

const readInputs = () => {
	const inputs = document.querySelectorAll(".create-input");

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
	const form = document.querySelector("#form-create");
	form.reset();
	stateFocus = true;
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
const inputCreator = (universeName, isConnected = false) => {
	let universeNameSplit = universeName.split("-");

	let newDiv = document.createElement("div");

	newDiv.id = `Universo${universeNameSplit[0]}_${universeNameSplit[1]}`;
	newDiv.className = "container-update-input";

	let newLabel = document.createElement("label");
	newLabel.setAttribute(
		"for",
		`Universo${universeNameSplit[0]}_${universeNameSplit[1]}`
	);
	newLabel.innerHTML = `Universo ${universeName}<br />`;

	let newInput = document.createElement("input");
	newInput.type = "checkbox";
	newInput.name = `Universo${universeNameSplit[0]}_${universeNameSplit[1]}`;
	newInput.id = `Universo${universeNameSplit[0]}_${universeNameSplit[1]}`;
	newInput.value = `${universeNameSplit[0]}_${universeNameSplit[1]}`;
	newInput.checked = isConnected;
	newInput.classList.add("update-input");

	newLabel.appendChild(newInput);
	newDiv.appendChild(newLabel);

	const form = document.querySelector("#form-update");
	form.appendChild(newDiv);
};

const openUpdateWindow = (universe = multiverse.selectedUniverse) => {
	const form = document.querySelector("#form-update");
	form.reset();

	let inputs = document.querySelectorAll(".container-update-input");
	inputs.forEach((input) => {
		form.removeChild(input);
	});

	const title = document.getElementById("title-update");
	title.innerHTML = `Universo: ${universe.name}`;

	let links = multiverse.template[universe.name].connections;

	for (let universeName in multiverse.template) {
		let isConnected = false;
		if (links.includes(universeName)) {
			isConnected = true;
		}
		if (universeName != universe.name) {
			inputCreator(universeName, isConnected);
		}
	}

	stateFocus = false;
	updateWindow.showModal();
};

const readInputsUpdate = () => {
	let newLinks = [];

	const inputs = document.querySelectorAll(".update-input");

	for (let input of inputs) {
		if (input.checked && newLinks.length < Universe.LIMIT_CONNECTIONS) {
			let string = input.value.split("_").join("-");

			newLinks.includes(string) ? undefined : newLinks.push(string);
		}
	}
	return newLinks;
};

const closeUpdateWindow = () => {
	let universe = multiverse.selectedUniverse;
	let newLinks = readInputsUpdate();

	let row = undefined;
	for (let i = 0; i < multiverse.universes.length; i++) {
		if (multiverse.universes[i].name == universe.name) {
			row = i;
			break;
		}
	}

	let newRow = [];
	let oldLinks = multiverse.links[row];
	for (let i = 0; i < oldLinks.length; i++) {
		if (newLinks.includes(multiverse.universes[i].name)) {
			newRow.push(1);
		} else {
			newRow.push(0);
		}
	}

	multiverse.links[row] = newRow;
	multiverse.connect();

	stateFocus = true;
	updateWindow.close();
};

/** DELETE */
