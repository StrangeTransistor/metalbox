/* @flow */

var postcss = require('postcss')
var cssnano = require('cssnano')

module.exports = function CssNano ()
	/* :Pipe<string, string, any> */
{
	return (input) =>
	{
		return postcss(
		[
			cssnano(
			{
				safe: true,
			})
		])
		.process(input)
		.then(it => it.css)
	}
}
