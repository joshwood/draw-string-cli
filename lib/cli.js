#!/c/dev/apps/nodejs/node

'use strict';

var nopt = require('nopt');
var info = require('../lib/info');
var app = require('../lib/app');

var opts = nopt({
    help: Boolean,
    version: Boolean
}, {
    h: '--help',
    v: '--version'
});

var args = opts.argv.remain;

/**
 * evaluate opts etc, then call the app
 */
function init(){

    if(opts.version){
        return info.version();
    }
    if(opts.help){
        return info.help();
    }

    app.process(args, opts);
}

init();
