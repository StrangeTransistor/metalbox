/* @flow */

var cmd = require('command-promise')

var load = require('../json/load')

var format =
`
{
  "rev": "%H",
  "msg": "%s",
  "timestamp": "%cI",
  "author": "%an"
}`

format = format.replace(/\n/g, '')
format = format.replace(/"/g, '\\"')
format = `--format="${format}"`

module.exports = function Rev ()
{
	return cmd('git log', '-1', format)
	.then(cmd.util.stdout)
	.then(cmd.util.trim)
	.then(load)
	.then(data =>
	{
		return describe()
		.then(rev =>
		{
			data.rev = rev

			return data
		})
	},
	() => null) /* no git repo */
}

function describe ()
{
	return cmd('git describe --always --long --abbrev=40 --dirty')
	.then(cmd.util.stdout)
	.then(cmd.util.trim)
}
