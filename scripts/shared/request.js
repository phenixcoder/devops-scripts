var https = require('follow-redirects').https;

async function Request(hostname, method = 'GET', path = '', headers = {}) {
  var options = {
    'method': method,
    'hostname': hostname,
    'path': path,
    'headers': headers,
    'maxRedirects': 20
  };
  return new Promise((resolve, reject) => {
    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        resolve(body.toString())
      });

      res.on("error", function (error) {
        reject(error);
      });
    });

    req.end();
  });
}

module.exports = Request;