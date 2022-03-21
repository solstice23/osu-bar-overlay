export default class WSConnection {
    constructor(onKeyEvent, port = 16899) {
		this.portNumber = port;
		this.onKeyEventFunc = onKeyEvent;
		this.onDateFunc = this.onData.bind(this);
		this.start();
    }

	onData(e) {
		this.onKeyEventFunc.call(this, JSON.parse(e.data));
	}

	start() {
		this.ws = new WebSocket(`ws://localhost:${this.portNumber ?? 16899}/`);

		this.ws.onmessage = this.onDateFunc;

		this.ws.onerror = (e) => {
			console.log("WebSocket error: ");
			console.error(e);
		};

		this.ws.onclose = () => {
			this.ws = null;
			setTimeout(this.start, 2000);
		};
	}
}
