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
    if (!args._[0]) {
      let responseOrgs = await Request('app.terraform.io', 'GET', `/api/v2/organizations/`, {
        'Authorization': `Bearer ${Environment().secrets.TFC_TOKEN}`
      });
      let errorString = 'Organization Missing\nPlease pass organization from list below:\n';
      const orgs = JSON.parse(responseOrgs).data
      orgs.forEach(org => {
          errorString = `${errorString} - ${org.id}\n`;
      })
      throw errorString;
    }
    
    const org = args._[0];

    let response = await Request('app.terraform.io', 'GET', `/api/v2/organizations/${org}/workspaces`, {
      'Authorization': `Bearer ${Environment().secrets.TFC_TOKEN}`
    })
    response = JSON.parse(response);
    if (response.errors) {
      response.errors.forEach(error => {
        if (error.status == 404) {
          throw `Organization ${org} not found.`
        }
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