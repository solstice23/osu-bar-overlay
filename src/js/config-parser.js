import {getKeyName, getKeyCode} from './key.js';
import configJson from "../../config.js";

export const getKeyList = () => {
	let keyList = [];
	for (let i of config.key) {
		let keyCode = i.key;
		if (typeof keyCode === 'string') {
			keyCode = getKeyCode(keyCode.toUpperCase());
		}
		keyList.push({
			keyCode: keyCode,
			displayName: i.displayName ?? getKeyName(keyCode)
		});
	}
	return keyList;
}

export const defaultKeyStatus = () => {
	let keyStatus = {};
	for (let key of getKeyList()) {
		keyStatus[key.keyCode] = false;
	}
	return keyStatus;
}

export const config = configJson;