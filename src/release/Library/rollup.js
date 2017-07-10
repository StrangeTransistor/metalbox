/* @flow */

var assign = Object.assign

var find = require('lodash/find')

var Artifact = require('../../artifact/Artifact')
var Glob = require('../../artifact/Glob')
var Copy = require('../../artifact/Copy')
var Composite = require('../../artifact/Composite')
var With = require('../../artifact/With')
var Watch = require('../../artifact/Watch')
var Remover = require('../../artifact/Remover')

var Rollup = require('../metalbucket/Rollup')

var glob = require('../metalbucket/smart-js-glob')

var label = require('../../label')


module.exports.Prod = () =>
{
	return Standard(glob.concat([ '!test/**', '!tests/**' ]))
}

module.exports.Types = () =>
{
	return Glob('', 'flow-typed/**', '', Copy())
}


function Standard (globs /* :?string[] */)
{
	var $globs = prepare_globs(globs)

	return Artifact(env =>
	{
		var targets = from_targets(env)
		var seq = []

		{
			var jsnext = find(targets, such => such[0] === 'jsnext')
			seq.push(Glob('', $globs, '', TargetJsnext(jsnext[1])))
		}

		{
			var node = find(targets, such => such[0] === 'node')
			seq.push(Glob('', $globs, '', TargetNode(node[1])))
		}

		return Composite(seq).construct(env)
	})
}

module.exports.Watch = () =>
{
	/* some crazyness: */
	var watch = Artifact(env =>
	{
		var targets = from_targets(env)
		var seq = []

		{
			var jsnext = find(targets, such => such[0] === 'jsnext')
			seq.push(TargetJsnext(jsnext[1]))
		}

		{
			var node = find(targets, such => such[0] === 'node')
			seq.push(TargetNode(node[1]))
		}

		var composite = Composite(seq)
		var watch = Watch(glob, label('Rollup', composite))

		/* TODO library watch.disengage */
		return watch.construct(env)
	})

	return Composite(
	[
		Standard(),
		watch,
	])
}


function prepare_globs (globs)
{
	if (globs)
	{
		return globs
	}
	else
	{
		return glob.slice()
	}
}


/* */
var target_defaults = 'jsnext-first'

var target_aliases =
{
	'jsnext-first':
	[
		[ 'jsnext', './' ],
		[ 'node',   'dist/' ],
	],
	'node-first':
	[
		[ 'node',   './' ],
		[ 'jsnext', 'dist/' ],
	],
	'node-only':
	[
		[ 'node',   './' ],
	],
	'jsnext-only':
	[
		[ 'jsnext', './' ],
	],
}

function from_targets (env)
{
	var target = target_defaults

	if (env.options && env.options.targets)
	{
		target = env.options.targets
	}

	if (typeof target === 'string')
	{
		if (target in target_aliases)
		{
			target = target_aliases[target]
		}
		else
		{
			throw new TypeError(`unknown target alias ${target}`)
		}
	}

	return target
}


function TargetJsnext (dest)
{
	return Dest(Copy(), dest)
}

function TargetNode (dest)
{
	return Dest(Remover(Rollup()), dest)
}

function Dest (target, dest /* :string */)
{
	return With(target, env => assign({}, env, { dst: env.dst.partial(dest) }))
}
