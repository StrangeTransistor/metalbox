/* @flow */

var Copy = require('../../artifact/Glob/Copy') // TODO Glob(Copy())
var Heat = require('../../artifact/Watch/Heat')

var glob = '**/*.@(jpg|png|gif)'

// TODO per-file emit

var Standard = module.exports.Standard = () =>
{
	return Copy(env => env.src(env.buckets_path), glob, 'assets')
}

module.exports.Watch = () =>
{
	return Heat(env => env.src(env.buckets_path, glob), Standard())
}
