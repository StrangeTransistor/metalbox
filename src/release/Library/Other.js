/* @flow */

var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')

var glob =
[
	'**/*.json',
	'**/*.hjson',

	'**/*.md',

	'*license*',
	'*LICENSE*',
	'*License*',

	'!package.json',
	'!coverage/**',

	'!test/**',
	'!tests/**',
]

module.exports = () =>
{
	return Glob('', glob, '', Copy())
}
