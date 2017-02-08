/* @flow */

var fs = require('fs-sync')
var exists = fs.exists
var load   = fs.readJSON
var write  = fs.write
var copy   = fs.copy

var dump = require('../../json/dump')

var Artifact  = require('../../artifact/Artifact')
var Composite = require('../../artifact/Composite')
var Glob      = require('../../artifact/Glob/Copy')

var glob = [ '**/*.json', '!package.json' ]

module.exports.Dev = () =>
{
	return Glob('', glob, '')
}

module.exports.Prod = () =>
{
	var assemble = Artifact((env /* :EnvInOut & EnvInstance */) =>
	{
		var cfg = env.src.partial('cfg/')

		var base  = cfg('cfg.json')
		var patch = cfg(env.instance + '.json')
		var to = env.dst('cfg/cfg.json')

		if (exists(base))
		{
			if (exists(patch))
			{
				var merge = require('lodash/merge')

				var json = merge({}, load(base), load(patch))

				return write(to, dump(json))
			}
			else
			{
				return copy(base, to, { force: true })
			}
		}
	})

	return Composite(
	[
		Glob('', glob.concat('!cfg/**'), ''),
		assemble
	])
}
