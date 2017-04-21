/* @flow */

var Proxy   = require('../../artifact/Proxy')
var Command = require('../../artifact/Command')

module.exports = function Serve ()
{
	return Proxy(Command(npm(), [ 'run', 'serve' ]), construct =>
	{
		return (env /* :EnvOnce & EnvPackage */) =>
		{
			if (env.once)
			{
				return
			}
			if (! (env.package.scripts))
			{
				return
			}
			if ('serve' in env.package.scripts)
			{
				return construct(env)
			}
		}
	})
}

function npm ()
{
	if (process.platform === 'win32')
	{
		return 'npm.cmd'
	}
	else
	{
		return 'npm'
	}
}
