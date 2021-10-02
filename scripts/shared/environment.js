const { existsSync, readFileSync } = require('fs');
const path = require('path');
const yargs = require('yargs');

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

    const args = yargs(process.argv.slice(4))
      .options('workspace', {
        default: process.env.TFC_WORKSPACE || TFC_CONFIG.TFC_WORKSPACE || TFC_CONFIG.WORKSPACE_ID
      })
      .options('token', {
        default: process.env.TFC_TOKEN || TFC_CONFIG.TFC_TOKEN
      })
      .argv;

    currentEnv.config = {
      // args: process.argv,
      paths: {
        pwd: process.env.PWD,
        home: process.env.HOME,
      },
      secrets: {
        TFC_TOKEN: args.token,
        TFC_WORKSPACE: args.workspace,
      },
      action: process.argv[3] || '',
      resource: process.argv[2] || '',
      args
    } 
  }

  if (render) {
    console.log('Envrionment');
    console.log(currentEnv.config);
  }

  return currentEnv.config;
}

module.exports = Environment;