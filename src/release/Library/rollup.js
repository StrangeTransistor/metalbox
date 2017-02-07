/* @flow */

var Glob   = require('../../artifact/Glob')
var GlobCp = require('../../artifact/Glob/Copy')

var Rollup = require('../metalbucket/rollup-transform')

var glob = '**/*.js'

module.exports.Standard = () =>
{
	return Glob('', glob, 'dist', Rollup())
}

module.exports.Modern = () =>
{
	return GlobCp('', glob, '')
}
