/* @flow */

var Artifact = require('./Artifact')

module.exports = function Esc /* ::<Env> */
(
	is_watch /* :?bool */,
	target   /* :T_Artifact<Env> */
)
	/* :T_Artifact<Env> */
{
	var art = Artifact(env =>
	{
		return target.construct(env)
	})

	art.disengage = () =>
	{
		return target.disengage()
	}

	is_watch = (is_watch == null || Boolean(is_watch))

	if (! process.stdin.isTTY)
	{
		is_watch = false
	}

	if (is_watch)
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

	return art
}
