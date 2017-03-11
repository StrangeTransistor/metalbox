/* @flow */

var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')

var glob =
[
	'**/*.json',
	'**/*.md',
	'license',
	'LICENSE',
	'License',
	'!package.json',
	'!coverage/**'
]

module.exports = () =>
{
	return Glob('', glob, '', Copy())
}
