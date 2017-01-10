/* @flow */
/* ::

type EnvWatch =
{
	is_esc?: boolean
};

*/

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
			console.info('esc watch mode')

			; (process.stdin/* :any */).setRawMode(true)

			process.stdin.resume()

			process.stdin.on('data', (data) =>
			{
				var code = data.toJSON().data[0]

				if (code === 27)
				{
					console.info('EXIT')
					process.exit() // TODO
				}
			})
		}

		return target.construct(env)
	})

	art.disengage = () =>
	{
		return target.disengage()
	}

	return art
}
