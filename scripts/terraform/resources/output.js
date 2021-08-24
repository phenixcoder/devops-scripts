const Environment = require("../../shared/environment");
const Request = require("../../shared/request");
const Help = require("../help");

const OUTPUT = {
  get: async (...args) => {
    const env = Environment();
    if (env.secrets.TFC_TOKEN) {
      Help('Missing TFC_TOKEN.');
    }
    if (env.secrets.TFC_WORKSPACE) {
      Help('Missing TFC_WORKSPACE.');
    }
    const state = await Request('app.terraform.io', 'GET', `/api/v2/workspaces/${env.secrets.TFC_WORKSPACE}/current-state-version`, {
      'Authorization': `Bearer ${env.secrets.TFC_TOKEN}`
    });

    console.log(state);

    const output_id = JSON.parse(state).data.relationships.outputs.data[0].id;

    let outputs = await Request('app.terraform.io', 'GET', `/api/v2/state-version-outputs/${output_id}`, {
      'Authorization': `Bearer ${env.secrets.TFC_TOKEN}`
    });

    outputs = JSON.parse(outputs).data.attributes.value;

    console.log(outputs.byString(env.args[0] || ''));

  },
}

module.exports = OUTPUT;