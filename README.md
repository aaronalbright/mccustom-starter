# McCustom Starter
Basic static site builder to be used on McClatchy Sinclair pages.

Built with [Parcel.js](https://parceljs.org/).

**Includes**
* `babel 7`
* `sass`
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

### To start a server at `localhost:3000`
```
yarn start
```

### Build a static site
```
yarn build
```
Builds files into `./build/public`

## Fetching external data

To fetch external data, first fill in one or both of the `docID` of `sheetID` with the desired Google Drive file after sharing it with the Goolge Services email.

File is saved to `./src/html/global.json`.

### Get AML-formatted Google Doc
```
yarn get:doc
```

### Get Google Sheet
```
yarn get:sheet
```

### Fetch a Google Sheet and update an extneral file via SSH
```
yarn push:sheet
```







