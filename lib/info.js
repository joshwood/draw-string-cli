'use strict';

// Project metadata.
var pkg = require('../package.json');

/**
 * Display version.
 */
exports.version = function() {
  console.log(pkg.name+' v' + pkg.version);
};

/**
 * Show message, then exit with a message and error code.
 * @param msg
 * @param code
 */
exports.fatal = function(msg, code) {
  console.log('Fatal error: ' + msg);
  console.log('');
  process.exit(code);
};

/**
 * Show help and exit.
 */
exports.help = function() {
  console.log('');
  [
    "A bunch of help ",
    "messages in an array."
  ].forEach(function(string){console.log(string)});
  process.exit();
};
