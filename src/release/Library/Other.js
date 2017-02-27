/* @flow */

var Copy = require('../../artifact/Glob/Copy')

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
	return Copy('', glob, '')
}
