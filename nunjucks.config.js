const fs = require('fs-extra');

module.exports = {
  root: './src/html',
  data: async () => await fs.readJSON('./src/data/context.json')
};
