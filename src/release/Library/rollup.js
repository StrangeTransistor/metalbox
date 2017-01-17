/* @flow */

var write = require('fs-sync').write

// var Artifact  = require('../../artifact/Artifact')
// var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob')
var GlobCp    = require('../../artifact/Glob/Copy')
// var Watch     = require('../../artifact/Watch')

var Rollup = require('../../producer/rollup/Backend')

var glob = '**/*.js'

module.exports.Standard = () =>
{
	var rollup = Rollup()

	return Glob('', glob, 'dist', (src, path, dst) =>
	{
		// TODO maybe create artifacts on-fly
		return rollup({ entry: src(path) })
		.then(code =>
		{
			return write(dst(path), code)
		})
	})
}

module.exports.Modern = () =>
{
	return GlobCp('', glob, '')
}
