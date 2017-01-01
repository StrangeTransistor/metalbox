/* @flow */

var postcss = require('postcss')
var autoprefixer = require('autoprefixer')

var Autoprefixer /* :T_Pipe<string, string, any> */
= function Autoprefixer (input)
{
	console.log(1)
	return postcss([ autoprefixer ]).process(input)
	.then(it => it.css)
}

module.exports = Autoprefixer
