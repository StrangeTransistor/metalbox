/* @flow */
/* ::

type EnvWatch =
{
	is_esc?: boolean
};

*/

var Promise = require('bluebird')

var Artifact = require('./Artifact')

module.exports = function Esc /* ::<Env> */
(
	target /* :T_Artifact<Env> */
)
	/* :T_Artifact<Env & EnvWatch> */
{
	var art = Artifact(env =>
	{
		var is_esc = env.is_esc

		is_esc = (is_esc == null || Boolean(is_esc))

		if (! process.stdin.isTTY)
		{
			is_esc = false
		}

		if (is_esc)
		{
			target.construct(env)

			console.info('esc watch mode')

			; (process.stdin/* :any */).setRawMode(true)

			process.stdin.resume()

			return new Promise(rs =>
			{
				var filter_esc = (data) =>
				{
					var code = data.toJSON().data[0]

					if (code === 27)
					{
						console.info('EXIT')

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
			return target.construct(env)
		}
	})

	art.disengage = () =>
	{
		return target.disengage()
	}

	return art
}
