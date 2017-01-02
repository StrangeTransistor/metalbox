/* @flow */

var pug = require('pug').renderFile

module.exports = function Pug ()
	/* :Producer<EnvFrontend, string> */
{
	return (env) =>
	{
		var filename = env.src(env.buckets_path, 'index/index.pug')

		var options =
		{
			pretty: false,
			dev: true,
			basedir: env.src('buckets')
		}

		return pug(filename, options)
	}
}
