require('dotenv').config();

const path = require('path');

const fs = require('fs-extra');
const node_ssh = require('node-ssh');
const Gootenberg = require('gootenberg');

const { getCredentials } = require('./get-credentials');

const localPath = path.join(process.cwd(), '.tmp/data.json');
const remotePath = path.join(process.env.PATH, process.env.npm_package_name, '/data.json');

let id = process.argv[2];

async function uploadSheet() {
  await getSheet(id);

  const ssh = new node_ssh();

  await ssh.connect({
    host: 'ssh.mcclatchyinteractive.com',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: 22,
    tryKeyboard: true,
    onKeyboardInteractive: (
      name,
      instructions,
      instructionsLang,
      prompts,
      finish
    ) => {
      if (
        prompts.length > 0 &&
        prompts[0].prompt.toLowerCase().includes('password')
      ) {
        finish([process.env.PASSWORD]);
      }
    }
  }).catch(console.error);

  await ssh.putFile(localPath, remotePath).catch(console.error)
  console.log("File uploaded");
  
  await ssh.dispose();

}

async function getSheet(id) {
  const goot = new Gootenberg();
  const c = await getCredentials();

  await goot.auth.jwt(c);

  let data = await goot.parse.table(id);

  await fs.outputJSON(localPath, data, {
    spaces: 2
  });
}

uploadSheet().catch(console.error);