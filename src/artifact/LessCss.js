/* @flow */

var read = require('fs-sync').read
var less = require('less')

var File = require('./File')

module.exports = function LessCss
(
	filename /* :string */
)
{
	return File(filename, env =>
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
	})
}
