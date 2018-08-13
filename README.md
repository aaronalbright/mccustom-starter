# McCustom Starter
Basic static site builder to be used on McClatchy Sinclair pages.

Built with [Parcel.js](https://parceljs.org/).

## Install

```
git clone https://github.com/aaronalbright/mccustom-starter
yarn install
```

## To start a server at `localhost:3000`
```
yarn start
```

## Build a static site
```
yarn build
```
Places files in `./build/public`

## Build a static site with relative links for CUE
```
yarn cue
```
Places files in `./cue`

## Fetch Google Doc in AML format
_Requires `drive.json` setup_
```
yarn text
```
Outputs into `./src/html/global.json`



