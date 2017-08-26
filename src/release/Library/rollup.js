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

var from_targets = require('./rollup-targets')


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

			if (jsnext)
			{
				seq.push(Glob('', $globs, '', TargetJsnext(jsnext[1])))
			}
		}

		{
			var node = find(targets, such => such[0] === 'node')

			if (node)
			{
				seq.push(Glob('', $globs, '', TargetNode(node[1])))
			}
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

		// TODO dry
		{
			var jsnext = find(targets, such => such[0] === 'jsnext')

			if (jsnext)
			{
				seq.push(TargetJsnext(jsnext[1], true))
			}
		}

		{
			var node = find(targets, such => such[0] === 'node')

			if (node)
			{
				seq.push(TargetNode(node[1], true))
			}
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


function TargetJsnext (dest, with_remover = false)
{
	return Dest(WithRemover(Copy(), with_remover), dest)
}

function TargetNode (dest, with_remover = false)
{
	return Dest(WithRemover(Rollup(), with_remover), dest)
}

function Dest (target, dest /* :string */)
{
	return With(target,
		/* @flow-off */
		env => assign({}, env,
		{
			dst: env.dst.partial(dest)
		})
	)
}

function WithRemover
(
	artifact /* :T_Artifact<*> */,
	with_remover /* :boolean */
)
{
	if (with_remover)
	{
		return Remover(artifact)
	}
	else
	{
		return artifact
	}
}
