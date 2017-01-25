/* @flow */

var babel = require('babel-core')

module.exports = function Babili ()
	/* :Pipe<string, string, any> */
{
	return (input) /* :string */ =>
	{
		var it = babel.transform(input,
		{
			presets:
			[
				require.resolve('babel-preset-babili')
			]
		})

		return it.code
	}
}
