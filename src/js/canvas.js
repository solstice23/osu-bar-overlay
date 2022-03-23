import Two from "two.js";
import config from "../../config.js";

const drawable = document.getElementById("drawable");

var two;

var bars = [];

for (i in config.key) {
	bars.push([]);
}

const removeUnusedBarVertical = (track) => {
	while (track[0] && track[0].position.y + track[0].height / 2 < -10) {
		two.remove(track[0]);
		track.shift();
	}
};

const updateBarVertical = (bar) => {
	const delta = config.speed * two.timeDelta / 100;
	if (bar.endTime === -1) {
		bar.height += delta;
		bar.position.y -= delta / 2;
	}else{
		bar.position.y -= delta;
		if (!bar.released) {
			bar.released = true;
			bar.height -= config.borderRadius;
			bar.position.y -= config.borderRadius / 2;
			bar.radius = Math.min(bar.radius, bar.height / 2);
		}
	}
}

const frameUpdateVertical = () => {
	for (let track of bars) {
		for (let bar of track) {
			updateBarVertical(bar);
		}
		removeUnusedBarVertical(track);
	}
}


const removeUnusedBarHorizontal = (track) => {
	while (track[0] && track[0].position.x + track[0].width / 2 < -10) {
		two.remove(track[0]);
		track.shift();
	}
};

const updateBarHorizontal = (bar) => {
	const delta = config.speed * two.timeDelta / 100;
	if (bar.endTime === -1) {
		bar.width += delta;
		bar.position.x -= delta / 2;
	}else{
		bar.position.x -= delta;
		if (!bar.released) {
			bar.released = true;
			bar.width -= config.borderRadius;
			bar.position.x -= config.borderRadius / 2;
			bar.radius = Math.min(bar.radius, bar.width / 2);
		}
	}
}

const frameUpdateHorizontal = () => {
	for (let track of bars) {
		for (let bar of track) {
			updateBarHorizontal(bar);
		}
		removeUnusedBarHorizontal(track);
	}
}

export const keyDown = (track) => {
	let bar;
	if (config.direction === "horizontal") {
		bar = two.makeRoundedRectangle(
			config.areaHeightOrWidth + config.borderRadius / 2,
			20 + (config.keySize + config.spacing) * track + config.keySize / 2,
			config.borderRadius,
			config.keySize,
			config.borderRadius
		);
	} else {
		bar = two.makeRoundedRectangle(
			20 + (config.keySize + config.spacing) * track + config.keySize / 2,
			config.areaHeightOrWidth + config.borderRadius / 2,
			config.keySize,
			config.borderRadius,
			config.borderRadius
		);
	}

	bar.fill = config.barColor;
	bar.linewidth = 0;
	bar.noStroke();
	bar.startTime = + new Date();
	bar.endTime = -1;
	bar.released = false;
	bars[track].push(bar);
	two.update();
}
export const keyUp = (track) => {
	bars[track][bars[track].length - 1].endTime = + new Date();
}
export const canvasInit = (totalKeySize) => {
	let width = totalKeySize, height = config.areaHeightOrWidth;
	if (config.direction === "horizontal") {
		width = config.areaHeightOrWidth, height = totalKeySize;
	}
	two = new Two({
		type: Two.Types.svg,
		width: width,
		height: height,
		autostart: true
	});
	two.appendTo(drawable);

/*	console.log( config.areaHeightOrWidth - 50);
	var rect = two.makeRectangle(50, config.areaHeightOrWidth - 50, config.keySize, 50);
    rect.fill = config.barColor;
    rect.linewidth = 0;
*/  
    two.update();

	two.bind("update", config.direction === "horizontal" ? frameUpdateHorizontal : frameUpdateVertical);

	return two;
}