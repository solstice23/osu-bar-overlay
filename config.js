export default config = {
key: [
		{
			key: "Z",
			displayName: "K1"
		},
		{
			key: "X",
			displayName: "K2"
		}
	],
	direction: "vertical", // "horizontal" or "vertical"
	speed: 50,
	keyColor: "#ff66aa",
	barColor: "#ff66aa88",
	keyTextColorPressed: "#ffffff",
	areaHeightOrWidth: 600,
	keySize: 60,
	spacing: 20,
	fade: true,
	inputSource: "gosumemory", // "inputOverlayOBSPlugin" or "gosumemory"
	port: 24050, // inputOverlayOBSPlugin default port is 16899, and gosumemory default port is 24050
};