import {getKeyList, defaultKeyStatus, config} from './config-parser.js';
import WSConnection from './ws.js';
import {setKeyHTML, getKeyDoms} from './key-dom.js';
import {canvasInit, keyDown, keyUp} from './canvas.js';

const keyList = getKeyList(), keys = defaultKeyStatus();

let keyCodeToTrack = {};
for (let i in keyList) {
	keyCodeToTrack[keyList[i].keyCode] = parseInt(i);
}
console.log(keyCodeToTrack);

console.log(keyList);

const totalKeySize = setKeyHTML(keyList);

const keyDoms = getKeyDoms(keyList);

var ws = new WSConnection((data) => {
	if (data.event_type != "key_pressed" && data.event_type != "key_released") return;

	const keyCode = data.keycode;

	if (!keys.hasOwnProperty(keyCode)) return;

	if (data.event_type === "key_pressed") {
		if (keys[keyCode]) return;
		keys[keyCode] = true;
		keyDoms[keyCode].classList.add("pressed");
		keyDown(keyCodeToTrack[keyCode]);
	} else if (data.event_type === "key_released") {
		if (!keys[keyCode]) return;
		keys[keyCode] = false;
		keyDoms[keyCode].classList.remove("pressed");
		keyUp(keyCodeToTrack[keyCode]);
	}

	//console.log(data);

}, config.port);



canvasInit(totalKeySize);