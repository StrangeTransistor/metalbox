/* @flow */

var File = require('../../artifact/File')
var Heat = require('../../artifact/Watch/Heat')

var Pug  = require('../../producer/Pug')

var Standard = module.exports.Standard = function ()
{
	return File('index.html', Pug())
}

module.exports.Watch = function ()
{
	return Heat(env => env.src(env.buckets_path, '*/*.pug'), Standard())
}

module.exports.Min = function ()
{
	return File('index.html', Pug())
}
