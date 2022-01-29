function Help(error) {
  if (error) {
    console.error(`Error: ${typeof error === 'string' ? error : error.message}`);
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