/* @flow */

var assign = Object.assign

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
		Copy('.sublime-project'),
	]),
		env => assign({}, env,
		{
			dst: env.dst.partial('.sublime')
		})
	)
}
