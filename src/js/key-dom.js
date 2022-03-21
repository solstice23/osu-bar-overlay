import config from "../../config.js";

export const getKeyDoms = (keyNames) => {
	let keyDoms = {};
	for (let i of keyNames) {
		keyDoms[i.keyCode] = document.getElementById(`key-${i.keyCode}`);
	}
	return keyDoms;
}



export const setKeyHTML = (keyNames) => {
	if (config.direction === "horizontal") {
		document.getElementById("main").classList.remove("vertical");
		document.getElementById("main").classList.add("horizontal");
	}

	if (config.fade) {
		document.getElementById("main").classList.add("fade");
	}

	let keyHTML = "";
	for (let i of keyNames) {
		keyHTML += `<div class="key" id="key-${i.keyCode}">${i.displayName}</div>`;
	}
	document.getElementById("keys").innerHTML = keyHTML;

	document.getElementById("keys").style.setProperty("--spacing", config.spacing + "px");
	document.getElementById("keys").style.setProperty("--key-size", config.keySize + "px");
	document.getElementById("keys").style.setProperty("--key-color", config.keyColor);
	document.getElementById("keys").style.setProperty("--key-text-color-pressed", config.keyTextColorPressed);

	const totalKeySize = config.keySize * keyNames.length + config.spacing * (keyNames.length - 1) + 40;

	if (config.direction === "horizontal") {
		document.getElementById("drawable").style.width = config.areaHeightOrWidth + "px";
		document.getElementById("drawable").style.height = totalKeySize + "px";
	} else {
		document.getElementById("drawable").style.width = totalKeySize + "px";
		document.getElementById("drawable").style.height = config.areaHeightOrWidth + "px";
	}
	return totalKeySize;
}