/* @flow */

var parse  = require('path').parse
var format = require('path').format

var File = require('../../artifact/File')
var Rollup = require('../../producer/rollup/Backend')

var label = require('../../label')

module.exports = () =>
{
	return label('Rollup', File(entry, Rollup()))
}

var entry = (env) => to_js(env.entry)

function to_js (filename /* :string */) /* :string */
{
	var parsed = parse(filename)

	if (parsed.ext === '.js')
	{
		return filename
	}
	else
	{
		parsed.ext = '.js'
		parsed.base = ''

		/* @flow-off */
		return format(parsed)
	}
}
