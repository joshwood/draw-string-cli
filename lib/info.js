'use strict';

// Project metadata.
var pkg = require('../package.json');

// Display grunt-cli version.
exports.version = function() {
  console.log(pkg.name+' v' + pkg.version);
};

// Show help, then exit with a message and error code.
exports.fatal = function(msg, code) {
  exports.helpHeader();
  console.log('Fatal error: ' + msg);
  console.log('');
  exports.helpFooter();
  process.exit(code);
};

// Show help and exit.
exports.help = function() {
  console.log('');
  [
    "A bunch of help ",
    "messages in an array."
  ].forEach(function(string){console.log(string)});
  process.exit();
};
