#!/usr/bin/env node

const Pageres = require('pageres');
const Ora = require('ora');

var program = require('commander');

program
    .version('0.0.1')
    .arguments('<url>')
    .action(function (url){
        websiteUrl=url;
    });

const spinner = new Ora({
    text: 'Creating screenshots',
	spinner: process.argv[2]
});

program.parse(process.argv);

if (typeof websiteUrl === 'undefined') {
   console.error('No url given!');
   process.exit(1);
}

spinner.start();
const pageres = new Pageres({delay: 2})
    .src( websiteUrl, ['1920x1080','1600x900','1440x900','1366x768','1280x1024',
        '1280x800','1200x800','640x360','480x640','480x320', '667x375'], {crop: true})
    .dest(__dirname+"/"+websiteUrl)
    .run()
    .then(() => spinner.stop());
