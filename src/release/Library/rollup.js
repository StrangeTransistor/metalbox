/* @flow */

var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Glob/Copy')

var Rollup = require('../metalbucket/Rollup')

var glob = [ '**/*.js', '!flow-typed/**', '!coverage/**' ]

module.exports.Standard = () =>
{
	return Glob('', glob, 'dist', Rollup())
}

module.exports.Modern = () =>
{
	return Copy('', glob, '')
}

module.exports.Types = () =>
{
	return Copy('', 'flow-typed/**', '')
}
