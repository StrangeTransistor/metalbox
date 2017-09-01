/* @flow */

var assign = Object.assign

var dirname = require('path').dirname
var basename = require('path').basename

var From = require('../../artifact/From')
var With = require('../../artifact/With')
var Composite = require('../../artifact/Composite')

var Directory = require('../../artifact/Directory')
var Copy = require('../../artifact/Copy/Single')

module.exports = function () /* :T_Artifact<EnvOut> */
{
	return From('sublime', Composite(
	[
		Directory('.sublime'),
		Sublime(),
	]))
}

function Sublime ()
{
	return With(Composite(
	[
		Copy('.gitignore'),
		Named(),
	]),
		env => assign({}, env,
		{
			dst: env.dst.partial('.sublime')
		})
	)
}

function Named ()
{
	return Copy('.sublime-project', (env) =>
	{
		var project_dir = dirname(env.dst())
		var name = basename(project_dir)

		return name + '.sublime-project'
	})
}
