/* @flow */

var babel = require('babel-core')

module.exports = function Browser ()
	/* :Pipe<string, string, any> */
{
	return (input) /* :string */ =>
	{
		var it = babel.transform(input,
		{
			presets:
			[
				[ require.resolve('babel-preset-env'),
				{
					targets:
					{
						browsers: 'last 2 versions'
					}
				}]
			]
		})

		return it.code
	}
}
