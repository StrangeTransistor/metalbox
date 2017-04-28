/* @flow */
/* ::

type EnvPug = EnvFrontend & EnvEntry;

*/


var pug = require('pug').renderFile
var options = require('./options')

module.exports = function Pug ()
	/* :Producer<EnvPug, string> */
{
	return (env) =>
	{
		var filename = env.src(env.entry)

		// TODO metalbox.resource

		return pug(filename, options(env, filename))
	}
}
