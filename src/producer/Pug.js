/* @flow */

var pug = require('pug').renderFile

module.exports = function Pug ()
	/* :Producer<EnvRelease, string> */
{
	return (env) =>
	{
		var filename = env.in('buckets/index/index.pug')

		var options =
		{
			pretty: false,
			dev: true,
			basedir: env.in('buckets')
		}

		return pug(filename, options)
	}
}
