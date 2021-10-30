function Help(errorMessage) {
  if (errorMessage) {
    console.error(`Error: ${errorMessage}`);
    // console.trace()
  }
  
  console.log(`
  Terraform Cloud - Devops Scripts

  Github: https://github.com/phenixcoder/devops-scripts

  Usage:
    terraform-cloud <resource> <action> [arguments]
  OR
    tfc <resource> <action> [arguments]

  `);
}

module.exports = Help;