/* @flow */

var pug = require('pug').renderFile
var options = require('./pug-options')

module.exports = function Pug ()
	/* :Producer<EnvFrontend, string> */
{
	return (env) =>
	{
		var filename = env.src(env.buckets_path, 'index/index.pug')

		// TODO metalbox.resource

		return pug(filename, options(env))
	}
}
