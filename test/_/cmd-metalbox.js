/* @flow */

var cmd = require('command-promise')

module.exports = function cmd_metalbox (/* :: ...arguments: string[] */)
{
	return cmd('node', __dirname + '/../../run/metalbox', arguments)
}
