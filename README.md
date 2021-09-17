# McCustom Starter

Basic static site builder for use in developering custom McClatchy High-Impact projects.

Built with [Vite.js](https://vitejs.dev/).

**Includes**

- `svelte`
- `PostCSS`
- `eslint`
- `handlebars`

## Install

You can clone this repo as usual, or use [`create-clone`](https://github.com/rdmurphy/create-clone).

```sh
yarn create clone aaronalbright/mccustom-starter <newProjectName>
# or
npm init clone aaronalbright/mccustom-starter <newProjectName>
```

### To start a server at `localhost:3000`

```sh
npm run dev
```

### Build a static site

```sh
npm run build
```

Builds files into `build/`

## Fetching external data

1. Create a Google Doc or Sheet.
2. Share it with McClatchy's Google service account.
3. Place the Google auth tokens file in your local home directory. (You'll get these from a Design Team member)
4. Copy the doc ID (between `d/` and `/edit` from the URL) and place it in either `config.docID` or `config.sheetID` in `package.json`

![docID](docs/img/google-id.png)

Currently, you can only work with one or the other, unless you change the output in `/utils/get-data.js`.

This feature is exclusively designed for use as the nunjucks templating context (i.e. `context.json`).

Eventually, all fetched files will be able to be placed in the `./data` folder.

### Get [AML-formatted](http://archieml.org/) Google Doc

```sh
npm run get:doc
```

### Get Google Sheet

```sh
npm run get:sheet
```

The file is saved to `src/data/context.json`.

### Fetch a Google Sheet and update an extneral file via SSH

```
npm run push:sheet
```
