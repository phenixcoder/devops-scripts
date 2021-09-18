const Environment = require("../../shared/environment");
const Request = require("../../shared/request");
const Help = require("../help");
const URL = require('url');
const { writeFileSync, existsSync } = require("fs");

const OUTPUT = {
  get: async (...args) => {
    const env = Environment();
    if (!env.secrets.TFC_TOKEN) {
      Help('Missing TFC_TOKEN.');
    }
    if (!env.secrets.TFC_WORKSPACE) {
      Help('Missing TFC_WORKSPACE.');
    }
    const response = await Request('app.terraform.io', 'GET', `/api/v2/workspaces/${env.secrets.TFC_WORKSPACE}/current-state-version`, {
      'Authorization': `Bearer ${env.secrets.TFC_TOKEN}`
    });

    const stateURL = URL.parse(JSON.parse(response).data.attributes['hosted-state-download-url']);
    const stateResponse = await Request(stateURL.hostname, 'GET', stateURL.path, {
      'Authorization': `Bearer ${env.secrets.TFC_TOKEN}`
    });

    console.log(stateResponse)
  },

  set: () => {
    throw "not implimented";
  }
}

module.exports = OUTPUT;