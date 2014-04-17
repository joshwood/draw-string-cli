'use strict';

var nopt = require('nopt');
var rest = require('restler');
var inquirer = require("inquirer");

var drawings_url = 'http://localhost:3030/drawings';

/**
 * essentially the main entry point for the CLI
 * @param args
 * @param opts
 */
exports.process = function (args, opts){

    /*
     * make a call to get all of the drawings from the local server
     */
    var retries = 0;
    rest.get(drawings_url).on('complete', function(result) {
        if (result instanceof Error) {
	        if(++retries > 3) {
                console.log('App server is not running, please start. Exiting!!'); return;
            }
            console.log('Failed... '+drawings_url+'('+result.message+')');
            // try again after 5 sec
            this.retry(5000);
        } else {
            var list = [];
            result.forEach(function(o){
                list.push({name: o.name, value: o._id});
            });
            inquireAboutIntentions(list);
        }
    });

    /**
     * display drawings to pick from
     * @param data
     */
    function inquireAboutIntentions(data){
        clearScreen();
        inquirer.prompt([
            {
                type: 'list',
                name: 'drawing',
                message: 'Pick drawing',
                pagination: true,
                choices: data
            },
            {
                type: 'list',
                name: 'action',
                message: 'Action',
                choices: [
                    {
                        key: 'd',
                        name: 'Delete Drawing',
                        value: 'delete'
                    },
                    {
                        key: 'c',
                        name: 'Clear Objects',
                        value: 'clear'
                    }
                ]
            }
        ], function(answers){
            console.log('about to perform the following, i hope that\'s what you wanted');
            console.log(JSON.stringify(answers, null, "  "));
            if(answers.action === 'delete'){
                deleteDrawing(answers.drawing);
            }
        });
    }

    /**
     * send a request to the server to delete a drawing
     * @param id
     */
    function deleteDrawing(id){
        rest.del(drawings_url+'/'+id).on('complete', function(result) {
            if (result instanceof Error) {
                console.log('Error:', result.message);
            } else {
                console.log('returned from delete with '+result);
            }
        });
    }

    /**
     * clears the command/terminal
     */
    function clearScreen(){
        var lines = process.stdout.getWindowSize()[1];
        for(var i = 0; i < lines; i++) {
            console.log('\r\n');
        }
    }

    /**
     * shows error
     * @param err
     * @returns {number}
     */
    function onErr(err) {
        console.log(err);
        return 1;
    }
};

