var spawn = require('child_process').spawn;
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var toolbelt;
var server;

// Required parameter: sandbox
if (!(argv['_'].length > 0)) {
  return console.log('Choose a sandbox name. e.g.: npm start sandbox');
}

var sandbox = argv['_'][0];
var configPath = (argv['_'][1] || 'webpack.config.js');

// Check if special config exists
try {
  fs.statSync(configPath);
} catch(err) {
  if (err && err.code === 'ENOENT') {
    return console.log('File', configPath, 'does not exist');
  }
}

console.log('Using webpack config:', configPath, '\n');
server = spawn('./node_modules/.bin/webpack-dev-server', ['--config', configPath], { stdio: ['pipe', process.stdout, process.stderr] });

console.log('Using sandbox:', sandbox, '\n');
toolbelt = spawn('./node_modules/.bin/vtex', ['watch', sandbox], { stdio: 'inherit' });

process.on('exit', function() {
  server.kill();
  toolbelt.kill();
});
