/* @flow */

var threshold = 14 * 1024

var isFile = require('fs-sync').isFile
var read = require('fs-sync').read

module.exports = function inline (filename /* :string */)
{
	if (! isFile(filename))
	{
		return null
	}

	var content = new Buffer(read(filename))

	if (content.length > threshold)
	{
		return null
	}

	var type = 'image/png'

	return `data:${ type };base64,${ content.toString('base64') }`
}
