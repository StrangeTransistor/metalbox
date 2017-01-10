/* @flow */

var Glob  = require('../../artifact/Glob')
var Watch = require('../../artifact/Watch')

var glob = '**/*.@(jpg|png|gif)'

var Standard = module.exports.Standard = () =>
{
	return Glob(env => env.src(env.buckets_path), glob, 'assets')
}

module.exports.Watch = () =>
{
	return Watch(env => env.src(env.buckets_path, glob), Standard())
}
