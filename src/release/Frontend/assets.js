/* @flow */

var assign = Object.assign

var Glob  = require('../../artifact/Glob')
var Copy  = require('../../artifact/Copy')
var With  = require('../../artifact/With')
var Watch = require('../../artifact/Watch')

var Composite = require('../../artifact/Composite')

var label = require('../../label')

var glob = '**/*.@(jpg|png|gif)'

var Standard = module.exports.Standard = () =>
{
	return Glob(env => env.src(env.buckets_path), glob, '', CopyAssets())
}

module.exports.Watch = () =>
{
	return Composite(
	[
		Standard(),
		Watch(env => env.src(env.buckets_path, glob),
		label('Assets', CopyAssets()),
		{
			/* @flow-off */
			relative: env => env.src(env.buckets_path)
		})
	])
}

function CopyAssets ()
{
	return With(Copy(),
		env => assign({}, env, { dst: env.dst.partial('assets') }))
}
