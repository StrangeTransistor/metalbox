/* @flow */

var write = require('fs-sync').write

var Glob = require('../../artifact/Glob')

var Rollup = require('../../producer/rollup/Backend')

module.exports.Standard = () =>
{
	var rollup = Rollup()

	return Glob('', '**/*.js', '', (src, path, dst) =>
	{
		return rollup({ entry: src(path) })
		.then(code =>
		{
			return write(dst(path), code)
		})
	})
}

module.exports.Watch = () =>
{

}
