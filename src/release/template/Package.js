/* @flow */

var From = require('../../artifact/From')
var Composite = require('../../artifact/Composite')

var Directory = require('../../artifact/Directory')
var Copy = require('../../artifact/Copy/Single')

module.exports = function ()
	/* :T_Artifact<EnvOut> */
{
	return From('package', Composite(
	[
		Directory(),
		Copy('package.json'),
		Copy('.flowconfig'),
		Copy('.eslintrc.js'),
		Copy('tsconfig.json'),
	]))
}
