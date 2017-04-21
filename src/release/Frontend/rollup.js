/* @flow */

var File = require('../../artifact/File')
var Heat = require('../../artifact/Watch/Heat')

var Pipeline = require('../../producer/Pipeline')

var Rollup = require('../../producer/rollup/Frontend')
var Babili = require('../../pipe/Babili')

// TODO test.js

var Standard = module.exports.Standard = function ()
{
	return File('index.js', Rollup())
}

module.exports.Watch = function ()
{
	return Heat(env => env.src(env.buckets_path, '*/*.@(js|pug)'), Standard())
}

module.exports.Min = function ()
{
	return File('index.js', Pipeline(
		Rollup(),
		Babili()
	))
}
