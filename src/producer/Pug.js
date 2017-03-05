/* @flow */

var pug = require('pug').renderFile

module.exports = function Pug ()
	/* :Producer<EnvFrontend, string> */
{
	return (env) =>
	{
		var filename = env.src(env.buckets_path, 'index/index.pug')

		// TODO metalbox.resource

		var options =
		{
			pretty: false,
			dev: env.dev || false,
			basedir: env.src(env.buckets_path)
		}

		return pug(filename, options)
	}
}
