/* @flow */

var method = require('bluebird').method
var join   = require('bluebird').join

var write = require('fs-sync').write

var producer = require('../producer')

var Artifact = require('./Artifact')

module.exports = function File /* ::<Env: EnvOut> */
(
	prod_filename /* :WeakProductable<Env, string> */,
	prod_content  /* :WeakProducer<Env, string> */
)
	/* :T_Artifact<Env> */
{
	var $filename = producer(prod_filename)
	var $content  = method(prod_content)

	var art = Artifact(env =>
	{
		return join($filename(env), $content(env), (filename, content) =>
		{
			write(env.dst(filename), content)
		})
	})

	art.describe = () =>
	{
		var $filename = ''
		if (typeof prod_filename === 'string')
		{
			$filename = ' ' + prod_filename
		}

		return `[File${$filename}]`
	}

	return art
}
