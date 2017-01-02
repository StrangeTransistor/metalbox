/* @flow */

var pug = require('pug').renderFile

module.exports = function Pug ()
	/* :Producer<EnvRelease, string> */
{
	return (env) =>
	{
		var filename = env.src('buckets/index/index.pug')

		var options =
		{
			pretty: false,
			dev: true,
			basedir: env.src('buckets')
		}

		return pug(filename, options)
	}
}
