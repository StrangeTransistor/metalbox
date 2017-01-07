/* @flow */

var File = require('../../artifact/File')
var Pug  = require('../../producer/Pug')

module.exports.Standard = function ()
{
	return File('index.html', Pug())
}

module.exports.Live = function ()
{
	//return File('index.html', Pug()) // TODO +Watch
}

module.exports.Min = function ()
{
	return File('index.html', Pug())
}
