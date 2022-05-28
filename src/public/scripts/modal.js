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
