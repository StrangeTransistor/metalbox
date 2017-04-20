/* @flow */

var cmd = require('command-promise')

module.exports = function cmd_metalbox ()
{
	return cmd('node', __dirname + '/../../run/metalbox', arguments)
}
