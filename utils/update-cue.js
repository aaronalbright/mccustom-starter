/* eslint-disable no-console */
require('dotenv').config();

const axios = require('axios').default;
const fs = require('fs').promises;

const cuePath =
  'https://cue-webservice.misitemgr.com/webservice/escenic/content/';

// second arg is CUE ID from package.json config
const url = `${cuePath}${process.argv[2]}`;

const username = process.env.CUE_USER;
const psswd = process.env.CUE_PASS;

const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;',
      }[tag] || tag)
  );

async function fetchCUEData() {
  try {
    const r = await axios.get(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${psswd}`).toString(
          'base64'
        )}`,
      },
    });
    console.log('Fetched CUE Data');
    return r;
  } catch (err) {
    console.error(err);
  }
}

async function pushToCUE(response, html) {
  try {
    const cueHTML = response.data;
    const etag = response.headers.etag;

    const embedReg = /(<vdf:field name="embedCode"><vdf:value>)([\s\S]+)(?=<\/vdf:value>)/;
    const stateReg = /<app:draft>(yes|no)<\/app:draft><vaext:state name=".+" href=".+"><\/vaext:state>/;

    const newEmbed = cueHTML
      .replace(embedReg, (_match, p1) => p1 + escapeHTML(html))
      .replace(stateReg, `<vaext:state>published</vaext:state>`);

    const options = {
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${psswd}`).toString(
          'base64'
        )}`,
        'Content-Type': 'application/atom+xml; type=entry',
        'If-Match': etag,
      },
    };
    await axios.put(response.config.url, newEmbed, options);
    console.log('Embed updated');
  } catch (e) {
    console.error('[pushToCCUE] error:', e.config);
  }
}

async function init() {
  try {
    const response = await fetchCUEData();
    const html = await fs.readFile('./dist/partials/embed.html', 'utf8');

    await pushToCUE(response, html);
  } catch (err) {
    console.error(err);
  }
}

init();
