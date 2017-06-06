/* @flow */

var fs = require('fs-sync')
var exists = fs.exists
var load   = fs.readJSON
var write  = fs.write
var cp     = fs.copy

var dump = require('../../json/dump')

var Artifact  = require('../../artifact/Artifact')
var Composite = require('../../artifact/Composite')
var Watch     = require('../../artifact/Watch')
var Glob      = require('../../artifact/Glob')
var Copy      = require('../../artifact/Copy')

var label = require('../../label')


var glob = [ '**/*.json', '!package.json', '!coverage/**', '!web/**' ]

module.exports.Watch = () =>
{
	var copy = label('JSON', Copy())

	return Composite(
	[
		Glob('', glob, '', copy),
		Watch(glob, copy)
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
				return cp(base, to, { force: true })
			}
		}
	})

	return Composite(
	[
		Glob('', glob.concat('!cfg/*.json'), '', Copy()),
		assemble
	])
}
