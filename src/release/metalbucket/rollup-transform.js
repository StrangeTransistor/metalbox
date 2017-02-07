/* @flow */

var write = require('fs-sync').write

var Rollup = require('../../producer/rollup/Backend')

module.exports = function transform ()
{
	var rollup = Rollup()

	return (
		src   /* :T_Rootpath */,
		entry /* :string */,
		dst   /* :T_Rootpath */
	) =>
	{
		// TODO, use File().construct() ?
		return rollup({ entry: src(entry) })
		.then(code =>
		{
			return write(dst(entry), code)
		})
	}
}
