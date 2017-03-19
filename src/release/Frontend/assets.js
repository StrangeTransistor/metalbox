/* @flow */

var Glob  = require('../../artifact/Glob')
var Copy  = require('../../artifact/Copy')
var Watch = require('../../artifact/Watch')

var Composite = require('../../artifact/Composite')

var label = require('../../label')

var glob = '**/*.@(jpg|png|gif)'

var Standard = module.exports.Standard = () =>
{
	return Glob(env => env.src(env.buckets_path), glob, 'assets', Copy())
}

module.exports.Watch = () =>
{
	return Composite(
	[
		Standard(),
		Watch(env => env.src(env.buckets_path, glob), label('Assets', Copy()))
	])
}
