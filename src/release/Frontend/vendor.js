/* @flow */

// var Watch = require('../../artifact/Watch')
var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')

var glob = [ '*', '!~assets' ]

module.exports.Standard = function ()
{
	return Glob(env => env.buckets('vendor'), glob, '', Copy())
}
