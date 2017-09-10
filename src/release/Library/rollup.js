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

var smart_glob = require('../metalbucket/smart-js-glob')
var js_mode = require('../metalbucket/js-mode')

var label = require('../../label')

var from_targets = require('./rollup-targets')


module.exports.Types = () =>
{
	return Composite(
	[
		Glob('', 'flow-typed/**', '', Copy()),
		Glob('', '**.js.flow', '', Copy()),
		Glob('', '**.d.ts', '', Copy()),
	])
}

// TODO copy types to both js-targets

module.exports.Prod = () =>
{
	return Standard({ tests: false })
}

module.exports.Watch = () =>
{
	/* some crazyness: */
	var watch = Artifact(env =>
	{
		var glob = smart_glob(
		{
			tests: true,
			ts: js_mode(env) === 'ts',
		})

		var targets = seq_targets(from_targets(env))
		var seq = targets.map(it =>
		{
			return it[0](it[1], true)
		})

		var composite = Composite(seq)
		var watch = Watch(glob, label('Rollup', composite))

		/* TODO library watch.disengage */
		return watch.construct(env)
	})

	return Composite(
	[
		Standard({ tests: true }),
		watch,
	])
}



var defaults =
{
	tests: false,
}

function Standard (options /* :$Shape<typeof defaults> */)
{
	options = assign({}, defaults, options)

	return Artifact(env =>
	{
		var glob = smart_glob(
		{
			tests: options.tests,
			ts: js_mode(env) === 'ts',
		})

		var targets = seq_targets(from_targets(env))
		var seq = targets.map(it =>
		{
			return Glob('', glob, '', it[0](it[1]))
		})

		return Composite(seq).construct(env)
	})
}


function seq_targets (targets)
{
	var seq = []

	var found_jsnext = find(targets, such => such[0] === 'jsnext')
	if (found_jsnext)
	{
		seq.push([ target_jsnext, found_jsnext[1] ])
	}

	var found_node = find(targets, such => such[0] === 'node')
	if (found_node)
	{
		seq.push([ target_node, found_node[1] ])
	}

	return seq
}

function target_jsnext (dest, with_remover = false)
{
	return Dest(WithRemover(Copy(), with_remover), dest)
}

function target_node (dest, with_remover = false)
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
