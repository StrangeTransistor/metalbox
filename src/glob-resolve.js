/* @flow */

var is_abs = require('path').isAbsolute
var join   = require('globjoin')

module.exports = (src /* :string */, globs /* :string[] */) =>
{
	return globs.map(glob =>
	{
		if (! is_abs(glob))
		{
			return join(src, glob)
		}
		else
		{
			return glob
		}
	})
}
