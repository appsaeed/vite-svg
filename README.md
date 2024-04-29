## Intro
Vite SVG plugin: effortless SVG import with support for various formats JSON, raw string, object, etc.

## Installation
Install with [npm](https://www.npmjs.com/)
```sh
npm i -D vite-svg
```
or Install with [yarn](https://www.npmjs.com/package/yarn)
```sh
yarn add vite-svg
```
or Install with [pnpm](https://www.npmjs.com/package/pnpm)
```sh
pnpm install vite-svg
```

# Usage
Vite plugin configuration 
````js
import viteSVG from 'vite-svg';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteSVG()
  ],
});
````
default extract 
````js
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteSVG({
        default: 'json'
    })
  ],
});
````
## SVG to object
**Extract SVG to a simple object with id attribute**
```js
import javascript from './javascript.svg?box'

console.log(javascript)
//output example
{
    "id": "",
    "viewBox": "0 0 256 256",
    "url": "javascript.svg#"
}
```
## svg to json
**Extract svg to json with all properties**
````js
import javascript from './javascript.svg?json'

console.log(javascript)
//output example
{
    "xmlns": "...",
    "xmlns:xlink": "...",
    "aria-hidden": "true",
    "role": "img",
    "class": "iconify iconify--logos",
    "width": "32",
    "height": "32",
    "preserveAspectRatio": "xMidYMid meet",
    "viewBox": "0 0 256 256",
    "fill": "#F7DF1E",
    "d": "...."
    ...
}
````

## svg to raw string
**Extract SVG to raw as string**
````js
import javascript from './javascript.svg?raw'

console.log(javascript)

//output example: <svg xmlns="..." xmlns:xlink="..." aria-hidden="true" role="img" class="iconify iconify--logos" width="32" height="32"  viewBox="0 0 256 256"><path fill="#F7DF1E" d="..."></path><path d="....."></path></svg>
````

