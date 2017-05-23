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

	var content = read(filename)

	if (content.length > threshold)
	{
		return null
	}

	var type = mime.lookup(filename)

	return encode(type, content)
}

function encode (type, content)
{
	if (type === 'image/svg+xml')
	{
		var content_string = content.toString()

		return `data:${ type },${ encodeURIComponent(content_string) }`
		.replace(/%20/g, ' ')
		.replace(/#/g, '%23')
	}
	else
	{
		return `data:${ type };base64,${ content.toString('base64') }`
	}
}
