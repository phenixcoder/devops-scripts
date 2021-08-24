const Environment = require("../../shared/environment");
const Request = require("../../shared/request");

const WORKSPACE = {
  get: async (args) => {
    if (!args[0]) {
      throw 'Workspace Name Missing'
    }

    const [org, ws] = args[0].split('/');

    const workspaces = await WORKSPACE.list([org], true);

    const returnValue = workspaces.find(workspace => {
      return workspace.attributes.name.toLowerCase() === ws.toLowerCase();
    });
    return returnValue;
  },

  list: async (args, returnOnly) => {
    if (!args[0]) {
      throw 'Organisation Missing'
    }
    const org = args[0];

    let response = await Request('app.terraform.io', 'GET', `/api/v2/organizations/${org}/workspaces`, {
      'Authorization': `Bearer ${Environment().secrets.TFC_TOKEN}`
    })
    response = JSON.parse(response);
    if (response.errors) {
      response.errors.forEach(error => {
        console.log(`error: [${error.status}] ${error.title}`);
      });
      throw "";
    }
    if (!returnOnly) {
      response.data.forEach(workspace => {
        console.log(`${workspace.id}\t${workspace.attributes.name} (${workspace.attributes.environment}) - ${workspace.attributes.description}`);
      })
    } else {
      return response.data;
    }
  }
}

module.exports = WORKSPACE;