/* @flow */

var Copy  = require('../../artifact/Glob/Copy')
var Watch = require('../../artifact/Watch')

var glob = '**/*.@(jpg|png|gif)'

var Standard = module.exports.Standard = () =>
{
	return Copy(env => env.src(env.buckets_path), glob, 'assets')
}

module.exports.Watch = () =>
{
	return Watch(env => env.src(env.buckets_path, glob), Standard())
}
