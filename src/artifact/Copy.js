/* @flow */

var cp = require('fs-sync').copy

var Artifact = require('./Artifact')

module.exports = function Copy /* ::<Env: EnvInOut & EnvEntry> */ ()
{
	return Artifact((env /* :Env */) =>
	{
		return cp(env.src(env.entry), env.dst(env.entry), { force: true })
	})
}
