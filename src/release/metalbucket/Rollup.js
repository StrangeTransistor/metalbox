/* @flow */

var File = require('../../artifact/File')
var Rollup = require('../../producer/rollup/Backend')

var label = require('../../label')

module.exports = () =>
{
	return label('Rollup', File(env => env.entry, Rollup()))
}
