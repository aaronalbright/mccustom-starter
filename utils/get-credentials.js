const os = require('os');
const path = require('path');
const fs = require('fs-extra')

async function getCredentials() {
    const credentialFile = path.join(os.homedir(), '.mcc_google_client_secrets.json');

    let credentials;

    try {
        credentials = await fs.readJson(credentialFile)
    } catch (e) {
        console.log(e);
    } 

    let client_email = credentials.client_email;
    let private_key = credentials.private_key;

    return {
      client_email,
      private_key
    };
}

module.exports = { getCredentials };