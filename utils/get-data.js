const fs = require('fs-extra');
const Gootenberg = require('gootenberg');
const { getCredentials } = require('./get-credentials');

const file = './src/html/global.json';

async function getData() {
  const goot = new Gootenberg();
  const c = await getCredentials();

  await goot.auth.jwt(c);

  let data;
  let id = process.argv[2];
  let type = process.argv[3];

  if (type == 'doc') {
    data = await goot.parse.archie(id);
  } else if (type == 'sheet') {
    data = await goot.parse.table(id);
  } else {
    throw new Error(`No file type provided`);
  }

  await fs.outputJson(file, data, { spaces: 2 });

  console.log(`Downloaded ${type}: ${id}`);
}

getData().catch(console.error);
