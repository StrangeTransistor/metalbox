/* @flow */

var Composite = require('../../artifact/Composite')

// var Watch = require('../../artifact/Watch')
var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')

var asset_dir = require('../metalbucket/asset-dir')


var glob = [ '*', '!~assets' ]

module.exports.Standard = function ()
{
	return Composite([ Flat(), Assets() ])
}

function Flat ()
{
	return Glob(env => env.buckets('vendor'), glob, '', Copy())
}

function Assets ()
{
	return Glob(
		env => env.buckets('vendor/~assets'),
		'*',
		env => asset_dir(env.hash),
		Copy()
	)
}
