/* @flow */

var pug = require('pug').renderFile
var pug_options = require('../release/metalbucket/options/pug')

module.exports = function Pug ()
	/* :Producer<EnvFrontend, string> */
{
	return (env) =>
	{
		var filename = env.src(env.buckets_path, 'index/index.pug')

		// TODO metalbox.resource

		return pug(filename, pug_options(env))
	}
}
