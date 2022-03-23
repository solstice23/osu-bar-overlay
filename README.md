# bar-overlay-for-osu
Visualize keyboard history for osu!

## Example

<p align="center">

![vertical](examples/vertical.gif)

Vertical

![horizontal](examples/horizontal.gif)

Horizontal

</p>

## Features

- Customizable: keys, colors, speed, spacing, etc.
- Receives input from websocket (requires the OBS plugin [input-overlay](https://github.com/univrsal/input-overlay) 5.0)

## TODO

- [x] Receive input from [gosumemory](https://github.com/l3lackShark/gosumemory)
- [ ] Round corners
- [ ] More key styles

## Usage

1. Choose one of the input sources below

+ Install [input-overlay](https://github.com/univrsal/input-overlay) plugin 5.0, and turn on the websocket checkbox in plugin settings.

+ Install [gosumemory](https://github.com/l3lackShark/gosumemory), and set a smaller update interval in gosumemory config file.

2. Clone this repository, edit `config.js` to set your preferences.

3. Build the project.

```
npm install
npm run build
```

The output html file is `dist/index.html`.

4. Add a browser source to OBS, and set the source to `file:///E:/bar-overlay-for-osu/dist/index.html` (your path).

5. Enjoy it!

## Addition

~~The OBS plugin [input-overlay](https://github.com/univrsal/input-overlay) 5.0 rc seems to have serious performance issues, so I am going to support websocket input of [gosumemory](https://github.com/l3lackShark/gosumemory) soon.~~

Now it supports [gosumemory](https://github.com/l3lackShark/gosumemory) source, you can change the `inputSource` and `port` item in `config.js` to use it.
