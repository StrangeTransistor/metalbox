/* @flow */

var write = require('fs-sync').write

// var With = require('../../artifact/With')
var Glob = require('../../artifact/Glob')

var Release = require('../../artifact/Release')

var Manifest = require('../metalbucket/Manifest')

var Rollup = require('../../producer/rollup/Backend')

module.exports = function Backend /* ::<Env: EnvBackend & EnvPrinter> */ ()
	/* :T_Release<Env> */
{
	var rollup = Rollup()

	return Release(
	[
		Manifest(),
		Glob('', '**/*.js', '', (src, path, dst) =>
		{
			return rollup({ entry: src(path) })
			.then(code =>
			{
				return write(dst(path), code)
			})
		})
	])
}
