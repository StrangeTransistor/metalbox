/* @flow */

var From = require('../../artifact/From')
var Composite = require('../../artifact/Composite')

var Directory = require('../../artifact/Directory')
var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')

var glob = 'package.json'

// TODO plain Copy

module.exports = function ()
	/* :T_Artifact<EnvOut> */
{
	return From('package', Composite(
	[
		/* @flow-off weird escalation Directory<> */
		(Directory() /* :T_Artifact<EnvOut> */),
		Glob('', glob, '', Copy(), { exclude_recursive: false }),
	]))
}
