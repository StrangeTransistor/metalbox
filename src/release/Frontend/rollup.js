/* @flow */

var File = require('../../artifact/File')
var Heat = require('../../artifact/Watch/Heat')

var Pipeline = require('../../producer/Pipeline')

var Rollup = require('../../producer/rollup/Frontend')
var Browser = require('../../pipe/Browser')
var Babili = require('../../pipe/Babili')

// TODO(v2) mocha,karma

var Standard = module.exports.Standard = function ()
{
	return File('index.js', Rollup())
}

module.exports.Watch = function ()
{
	return Heat(env => env.buckets('**/*.@(js|ts|pug)'), Standard())
}


var hashed = (env) => `index.${env.hash}.js`

module.exports.Min = function ()
{
	return File(hashed, Pipeline(
		Rollup(),
		Browser(),
		Babili()
	))
}
