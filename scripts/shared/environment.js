const { existsSync, readFileSync } = require('fs');
const path = require('path');

const currentEnv = {
  TFCRC_PATH: undefined,
  config: undefined
}
const Environment = (render) => {
  if (!currentEnv.config) {
    const TFCRC_PATH = path.join(process.env.PWD, '.tfcrc');
    const TFC_CONFIG = {};
    if (existsSync(TFCRC_PATH)) {
      currentEnv.TFCRC_PATH = TFCRC_PATH;

      readFileSync(TFCRC_PATH, { encoding: 'utf-8' })
      .split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if(key && value) {
          TFC_CONFIG[key] = value;
        }
      });
    }

    currentEnv.config = {
      // args: process.argv,
      paths: {
        pwd: process.env.PWD,
        home: process.env.HOME,
      },
      secrets: {
        TFC_TOKEN: process.env.TFC_TOKEN || TFC_CONFIG.TFC_TOKEN,
        TFC_WORKSPACE: process.env.TFC_WORKSPACE || TFC_CONFIG.TFC_WORKSPACE || TFC_CONFIG.WORKSPACE_ID,
      },
      action: process.argv[3] || '',
      resource: process.argv[2] || '',
      args: process.argv.slice(4)
    } 
  }

  if (render) {
    console.log('Envrionment');
    console.log(currentEnv.config);
  }

  return currentEnv.config;
}

module.exports = Environment;