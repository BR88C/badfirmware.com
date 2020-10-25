# badfirmware.com

A website built utilizing regl for it's primary functionality that will display a random animation upon refreshing the page, hosted on the root directory of my domain [badfirmware.com](https://www.badfirmware.com). Most of the animations use [regl's examples](https://github.com/regl-project/regl/tree/gh-pages/example) as a boilerplate.

## Testing

To test your code, install your node modules by running the following in the same directory as index.js:
```
npm install
```
If it ins't installing dev dependences, check your npm config:
```
npm config get production
```
To test your code, run the following in the same directory as index.js:
```
npm start
```

## Building

To build an html, run the following in the same directory as index.js:
```
npm run-script build
```
