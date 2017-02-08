/* @flow */

var Proxy   = require('../../artifact/Proxy')
var Command = require('../../artifact/Command')

module.exports = function Serve ()
{
	return Proxy(Command('npm', [ 'run', 'serve' ]), construct =>
	{
		return (env) =>
		{
			if (! env.once)
			{
				return construct(env)
			}
		}
	})
}
