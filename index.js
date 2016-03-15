const http = require('http');
const PythonShell = require('python-shell');
const watson = require('watson-developer-cloud');
const fs = require("fs");

var myArgs = process.argv.slice(2);

var options = {
  args: [myArgs[0], myArgs[1]]
};
 
PythonShell.run('getBio.py', options, function (err, results) {
  if (err) throw err;
  console.log('results: %j', results);
});

var personality_insights = watson.personality_insights({
  username: 'd381c684-15fd-498f-ba1f-aec028c3e27d',
  password: 'wUTO3jJge2dM',
  version: 'v2'
});

personality_insights.profile({
  text: fs.readFileSync('bio.txt'),
  language: 'en' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});

http.createServer( (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');