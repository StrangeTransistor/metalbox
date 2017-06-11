/* @flow */

var read = require('fs-sync').read
var less = require('less')

var asset_hash = require('./less-asset-hash')

module.exports = function LessCss ()
	/* :Producer<EnvFrontend, string> */
{
	return (env) =>
	{
		var filename = env.buckets('index/index.less')
		var content  = read(filename)

		var options =
		{
			filename: filename,
			paths: [ env.src(), env.buckets() ],
			plugins:
			[
				asset_hash(env),
			],
			modifyVars:
			{
				dev:  env.dev || false,
				hash: env.hash,
			},
		}

		return less.render(content, options)
		.then(it => it.css)
	}
}
