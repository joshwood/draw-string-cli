#!/usr/bin/env node

'use strict';

var nopt = require('nopt');
var info = require('../lib/info');
var app = require('../lib/app');

/*
 * sets up our command line options
 */
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

    /*
     * start the process
     */
    app.process(args, opts);
}

init();
