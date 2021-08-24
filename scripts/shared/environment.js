const Environment = (render) => {
  const env = {
    // args: process.argv,
    paths: {
      pwd: process.env.PWD,
      home: process.env.HOME,
    },
    secrets: {
      TFC_TOKEN: process.env.TFC_TOKEN,
      TFC_WORKSPACE: process.env.TFC_WORKSPACE,
    },
    action: process.argv[2] || '',
    resource: process.argv[3] || '',
    args: process.argv.slice(4)
  }
  if (render) {
    console.log('Envrionment');
    console.log(env);
  }

  return env;
}

module.exports = Environment;