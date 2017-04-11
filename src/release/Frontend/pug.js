/* @flow */

var basename = require('path').basename

var File = require('../../artifact/File')
var Glob = require('../../artifact/Glob')
var Heat = require('../../artifact/Watch/Heat')

var Pug  = require('../metalbucket/Pug')

var label = require('../../label')


var glob = (env) =>
{
	return env.src(env.buckets_path, 'index', '*.pug')
}

var plain_entry = (env) =>
{
	return basename(env.entry, '.pug') + '.html'
}

var Standard = module.exports.Standard = function ()
{
	return label('Pug → HTML', Glob('', glob, '', File(plain_entry, Pug())))
}

module.exports.Watch = function ()
{
	return Heat(env => env.src(env.buckets_path, '**/*.pug'), Standard())
}

module.exports.Min = Standard
