/* @flow */

var fs = require('fs-sync')
var exists = fs.exists
var load   = fs.readJSON
var write  = fs.write
var copy   = fs.copy

var dump = require('../../json/dump')

var Artifact  = require('../../artifact/Artifact')
var Composite = require('../../artifact/Composite')
var Watch     = require('../../artifact/Watch')
var Glob      = require('../../artifact/Glob/Copy')

var glob_json = '**/*.json'
var ignore = 'package.json'
var glob = [ glob_json, '!' + ignore ]

module.exports.Watch = () =>
{
	var art = Artifact((env /* :EnvInOut & EnvEntry */) =>
	{
		return copy(env.src(env.entry), env.dst(env.entry), { force: true })
	})

	art.describe = () =>
	{
		return '[JSON]'
	}

	return Composite(
	[
		Glob('', glob, ''),
		Watch([ glob_json, { ignored: ignore } ], art)
	])
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
