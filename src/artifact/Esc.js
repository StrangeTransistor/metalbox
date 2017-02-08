/* @flow */

var bold = require('cli-color').bold

var Promise = require('bluebird')

var Artifact = require('./Artifact')

/* ::

import type { EnvOnce } from './Watch';

*/

module.exports = function Esc /* ::<Env: EnvOnce> */
(
	target /* :T_Artifact<Env> */
)
	/* :T_Artifact<Env & EnvPrinter> */
{
	var art = Artifact((env /* :Env & EnvPrinter */) =>
	{
		var once = env.once

		if (! process.stdin.isTTY)
		{
			once = true
		}

		if (! once)
		{
			target.construct(env)

			env.printer.write(`Use ${bold('ESC')} to stop recurrying Artifact`)

			; (process.stdin/* :any */).setRawMode(true)

			process.stdin.resume()

			return new Promise(rs =>
			{
				var filter_esc = (data) =>
				{
					var code = data.toJSON().data[0]

					if (code === 27)
					{
						env.printer.write(bold('ESC'))

						process.stdin.removeListener('data', filter_esc)
						; (process.stdin/* :any */).setRawMode(false)
						process.stdin.pause()

						return rs(target.disengage())
					}
				}

				process.stdin.on('data', filter_esc)
			})
		}
		else
		{
			return target.construct(Object.assign(env, { once: true }))
		}
	})

	art.disengage = () =>
	{
		return target.disengage()
	}

	return art
}
