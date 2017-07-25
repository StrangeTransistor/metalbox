/* @flow */

var From = require('../../artifact/From')
var Composite = require('../../artifact/Composite')

var Directory = require('../../artifact/Directory')
var Glob = require('../../artifact/Glob')

var Copy  = require('../../artifact/Copy')
var Copy1 = require('../../artifact/Copy/Single')

var glob = '**'

module.exports = function ()
	/* :T_Artifact<EnvOut> */
{
	return From('fullstack', Composite(
	[
		Directory(),
		Glob('', glob, '', Copy()),

		Copy1('.flowconfig'),
		Copy1('.eslintrc.js'),

		Copy1('web/.flowconfig'),
		Copy1('web/.eslintrc.js'),
	]))
}
