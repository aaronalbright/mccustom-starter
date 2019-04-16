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
    
    return {
      client_email: credentials.client_email,
      private_key: credentials.private_key
    };
}

module.exports = { getCredentials };