function Help(errorMessage) {
  if (errorMessage) {
    console.error(`Error: ${errorMessage}`);
  }
  
  console.log(`
  Terraform Cloud - Devops Scripts

  Github: https://github.com/phenixcoder/devops-scripts

  Usage:
    terraform-cloud <action> <resource> [arguments]
  OR
    tfc <action> <resource> [arguments]

  `);
}

module.exports = Help;