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
yarn
```

If you want a fresh git directory

### Using nunjucks
The context file that gets rendered with the template is stored in `./src/html/global.json`.

### To start a server at `localhost:3000`
```
yarn start
```

### Build a static site
```
yarn build
```
Builds files into `./build/`

## Fetching external data

1. Create a Google Doc or Sheet. 
2. Share it with McClatchy's Google service account.
3. Place the Google auth tokens file in your local home directory.
4. Copy the doc ID (between `d/` and `/edit` from the URL and place it in either `config.docID` or `config.sheetID` in `package.json`

![docID](docs/img/google-id.png)

Currently, you can only work with one or the other, unless you change the output in `/utils/get-data.js`.

This feature is exclusively designed for use as the nunjucks templating cotent.

Eventually, everything will be put in a `./data` folder.

### Get [AML-formatted](http://archieml.org/) Google Doc
```
yarn get:doc
```

### Get Google Sheet
```
yarn get:sheet
```

Files are saved to `./src/html/global.json`.

### Fetch a Google Sheet and update an extneral file via SSH
```
yarn push:sheet
```

---

## To do

* Better handling of multiple data sources
* Option for not storing data as a nunjucks context





