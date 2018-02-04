/* @flow */

var Glob  = require('../../artifact/Glob')
var Watch = require('../../artifact/Watch')

var Composite = require('../../artifact/Composite')
var Remover = require('../../artifact/Remover')

var Copy  = require('../../artifact/Copy')

var glob =
[
	'**/*.md',

	'!coverage/**',

	'!test/**',
	'!tests/**',
]

var Standard = module.exports = () =>
{
	return Glob('', glob, '', Copy())
}

module.exports.Watch = () =>
{
	return Composite(
	[
		Standard(),
		Watch(glob, Remover(Copy()))
	])
}
