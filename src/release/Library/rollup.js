/* @flow */

var assign = Object.assign

var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')
var Composite = require('../../artifact/Composite')
var With = require('../../artifact/With')

var Watch = require('../../artifact/Watch')

var Rollup = require('../metalbucket/Rollup')

var glob = require('../metalbucket/smart-js-glob')

// TODO glob !test see backend
var Standard = module.exports.Standard = () =>
{
	return Composite(
	[
		Glob('', glob, '', Copy()),
		Glob('', glob, 'dist', Rollup())
	])
}

module.exports.Watch = () =>
{
	return Composite(
	[
		Standard(),
		Watch([ glob ], Composite(
		[
			Copy(),
			With(Rollup(), dist)
		]))
	])
}

var dist = (env) => assign({}, env, { dst: env.dst.partial('dist') })

module.exports.Types = () =>
{
	return Glob('', 'flow-typed/**', '', Copy())
}
