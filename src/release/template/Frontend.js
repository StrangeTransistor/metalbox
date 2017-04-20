/* @flow */

var From = require('../../artifact/From')
var Composite = require('../../artifact/Composite')

var Directory = require('../../artifact/Directory')
var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')

var glob = '**/*.@(pug|less|css|js)'

module.exports = function ()
	/* :T_Artifact<EnvOut> */
{
	return From('frontend', Composite(
	[
		Directory(),
		Glob('', glob, '', Copy()),
	]))
}
