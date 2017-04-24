/* @flow */

var spawn = require('child_process').spawn

var Promise = require('bluebird')
var resolve = require('bluebird').resolve

var Artifact = require('./Artifact')

var kill = require('bluebird').promisify(require('tree-kill'))

module.exports = function Command /* ::<Env> */
(
	command /* :string */,
	args    /* :string[] */
)
	/* :T_Artifact<Env> */
{
	var $spawn /* :?child_process$ChildProcess */ = null

	var art = Artifact(() =>
	{
		release()
		var $$spawn = $spawn = spawn(command, args, { stdio: [ 'pipe', 'inherit', 'inherit' ] })

		return new Promise(rs =>
		{
			$$spawn.once('exit', () => rs())
		})
	})

	art.disengage = () =>
	{
		return release()
	}

	function release ()
	{
		if ($spawn)
		{
			return kill($spawn.pid, 'SIGKILL')
			.then(() =>
			{
				$spawn = null
			})

			// TODO signals?
			// 'SIGINT'
			// 'SIGTERM'
		}
		else
		{
			return resolve()
		}
	}

	return art
}
