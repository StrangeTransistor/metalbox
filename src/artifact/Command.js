/* @flow */

var spawn = require('child_process').spawn

var Promise = require('bluebird')
var resolve = require('bluebird').resolve

var Artifact = require('./Artifact')

module.exports = function Command /* ::<Env> */
(
	command /* :string */,
	args    /* :string[] */
)
	/* :T_Artifact<Env> */
{
	var $spawn = null

	var art = Artifact(() =>
	{
		release()
		$spawn = spawn(command, args, { stdio: 'pipe' })

		return new Promise(rs =>
		{
			/* @flow-off */
			$spawn.once('exit', () =>
			{
				return rs()
			})
		})
	})

	art.disengage = () =>
	{
		release()

		return resolve()
	}

	function release ()
	{
		if ($spawn)
		{
			$spawn.kill('SIGKILL')

			$spawn = null
		}
	}

	return art
}
