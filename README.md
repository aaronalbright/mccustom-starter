# McCustom Starter
Basic static site builder to be used on McClatchy Sinclair pages.

Built with [Parcel.js](https://parceljs.org/).

**Includes**
* `babel-preset-env`
* `node-sass`
* `autoprefixer`
* `eslint`
* `nunjucks`


## Install

```
git clone https://github.com/aaronalbright/mccustom-starter
yarn install
```

## Using nunjucks
The context file that gets rendered with the template is stored in `./src/html/global.json`.

If you've set up [google-doc-to-json](https://www.npmjs.com/package/googledoc-to-json), you can output an AML-formatted Google Doc to `global.json`.

## To start a server at `localhost:3000`
```
yarn start
```

## Build a static site
```
yarn build
```
Builds files into `./build/public`

## Build a static site with relative links for CUE
```
yarn cue
```
Builds files into `./cue`

**`config.url` must be set in `package.json`**

## Fetch Google Doc in AML format
_Requires `drive.json` setup_
```
yarn text
```
Outputs into `./src/html/global.json`

**`config.docID` must be set in `package.json`**



