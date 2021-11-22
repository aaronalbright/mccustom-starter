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

### Build a static embed

Puts files into `dist/`. Make sure you update the `name` in `package.json` to ensure the base URL is updated.

```sh
npm run build
```

## Fetching external data

### v2
As of 2021, we have a new method of using data or documents from Google Drive. 
By taking advantage of Google Apps Script, you will be able to "publish" content from a Sheet or Document to a McClatchy domain at `www.[domain].com/static/hi/`. This application is still in beta. Below you'll find the original method to extract data from documents.

### v1

1. Create a Google Doc or Sheet.
2. Share it with McClatchy's Google service account.
3. Place the Google auth tokens file in your local home directory. (You'll get these from a High Impact Team member)
4. Copy the doc ID (between `d/` and `/edit` from the URL) and place it in either `config.docID` or `config.sheetID` in `package.json`

![docID](docs/img/google-id.png)

### Get [AML-formatted](http://archieml.org/) Google Doc

```sh
npm run get:doc
```

### Get Google Sheet

```sh
npm run get:sheet
```

The file is saved to `src/data/[type]Data.json`.