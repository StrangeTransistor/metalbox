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
				discardUnused: { fontFace: false }
			})
		])
		.process(input)
		.then(it => it.css)
	}
}
