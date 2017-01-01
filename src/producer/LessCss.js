/* @flow */

var read = require('fs-sync').read
var less = require('less')

module.exports = function LessCss ()
/* :Producer<EnvRelease, string> */
{
	return (env) =>
	{
		var filename = env.in('buckets/index/index.less')
		var content  = read(filename)

		var options =
		{
			filename: filename,
			paths: [ env.in(), env.in('buckets') ]
		}

		return less.render(content, options)
		.then(it => it.css)
	}
}
