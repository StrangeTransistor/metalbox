/* @flow */

var assign = Object.assign

var Glob  = require('../../artifact/Glob')
var Copy  = require('../../artifact/Copy')
var With  = require('../../artifact/With')
var Watch = require('../../artifact/Watch')

var Composite = require('../../artifact/Composite')

var label = require('../../label')

var glob = '**/*.@(jpg|png|gif|svg|ico|ttf|eot|woff)'

var Standard = module.exports.Standard = () =>
{
	return Glob(env => env.buckets(), glob, '', CopyAssets())
}

module.exports.Watch = () =>
{
	return Composite(
	[
		Standard(),
		Watch(env => env.buckets(glob),
		label('Assets', CopyAssets()),
		{
			/* @flow-off */
			relative: env => env.buckets(),
			large: true,
		})
	])
}

function CopyAssets ()
{
	return With(Copy(),
	env =>
	{
		return assign({}, env, { dst: env.dst.partial('assets') })
	})
}


module.exports.Min = () =>
{
	return Glob(env => env.buckets(), glob, '', CopyAssetsHash())
}

function CopyAssetsHash ()
{
	return With(Copy(),
	env =>
	{
		return assign({}, env, { dst: env.dst.partial(`assets-${env.hash}`) })
	})
}
