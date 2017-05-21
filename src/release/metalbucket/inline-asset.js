/* @flow */

var threshold = 14 * 1024

var read = require('fs').readFileSync

var isFile = require('fs-sync').isFile
var mime = require('mime')

module.exports = function inline (filename /* :string */)
{
	if (! isFile(filename))
	{
		return null
	}

	var content = new Buffer.from(read(filename))

	if (content.length > threshold)
	{
		return null
	}

	var type = mime.lookup(filename)

	return `data:${ type };base64,${ content.toString('base64') }`
}
