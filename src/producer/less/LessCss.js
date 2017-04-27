/* @flow */

var read = require('fs-sync').read
var less = require('less')

module.exports = function LessCss ()
	/* :Producer<EnvFrontend, string> */
{
	return (env) =>
	{
		var filename = env.src(env.buckets_path, 'index/index.less')
		var content  = read(filename)

		var options =
		{
			filename: filename,
			paths: [ env.src(), env.src(env.buckets_path) ]
		}

		return less.render(content, options)
		.then(it => it.css)
	}
}
