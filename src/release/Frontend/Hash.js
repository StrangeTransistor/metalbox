
var With = require('../../artifact/With')

var randomstring = require('randomstring').generate

module.exports = function Hash /* ::<Env: EnvFrontend> */
(target /* :T_Artifact<Env> */)
	/* :T_Artifact<Env> */
{
	return With(target, env =>
	{
		if (! env.hash)
		{
			env.hash = randomstring(
			{
				length: 5,
				charset: 'hex',
			})
		}

		console.log('NEW', env.hash)

		return env
	})
}
