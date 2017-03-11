/* @flow */

var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')

var Rollup = require('../metalbucket/Rollup')

var glob = require('../metalbucket/smart-js-glob')

module.exports.Standard = () =>
{
	return Glob('', glob, 'dist', Rollup())
}

module.exports.Modern = () =>
{
	return Glob('', glob, '', Copy())
}

module.exports.Types = () =>
{
	return Glob('', 'flow-typed/**', '', Copy())
}
