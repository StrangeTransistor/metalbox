/* @flow */

var postcss = require('postcss')
var autoprefixer = require('autoprefixer')

module.exports = function Autoprefixer ()
/* :Pipe<string, string, any> */
{
	return (input) =>
	{
		return postcss([ autoprefixer ]).process(input)
		.then(it => it.css)
	}
}
