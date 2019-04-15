const fs = require('fs-extra');
const Gootenberg = require('gootenberg');
const { getCredentials } = require('./get-credentials');

const file = './src/html/global.json';

async function getDoc() {
  const goot = new Gootenberg();
  const c = await getCredentials();

  await goot.auth.jwt(c);

  // Passes id from node arg
  const data = await goot.parse.archie(process.argv[2]);

  await fs.outputJson(file, data, {spaces: 2})

  console.log(`Downloaded file: ${process.argv[2]}`);
}

getDoc().catch(console.error);