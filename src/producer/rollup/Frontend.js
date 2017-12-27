/* @flow */

var dump = JSON.stringify

var presolve = require('bluebird').resolve

var rollup = require('rollup')

var include  = require('rollup-plugin-includepaths')
var globals  = require('rollup-plugin-node-globals')
var builtins = require('rollup-plugin-node-builtins')
var resolve  = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var json     = require('rollup-plugin-json')
var ts       = require('rollup-plugin-typescript')
var flow     = require('rollup-plugin-flow')
var pug      = require('rollup-plugin-pug')
var virtual  = require('rollup-plugin-virtual')

var js_mode = require('../../release/metalbucket/js-mode')

var pug_options = require('../../release/metalbucket/producer/Pug/options')

// TODO(v2) pass options from env to plugins, use `object-path`

module.exports = function Rollup ()
	/* :Producer<EnvFrontend, string> */
{
	var plugins_common =
	[
		globals(),
		'#include',
		builtins(),
		'#typescript',
		resolve(
		{
			jsnext:  true,
			browser: true,
		}),
		commonjs(
		{
			sourcemap: false
		}),
		json(),
		'#pug',
		'#virtual',
		'#flow',
	]

	var plugins_ts = plugins_common

	/*
	plugins_ts = replace(plugins_ts, '#typescript', ts(
	{
		typescript: require('typescript')
	}))
	*/
	plugins_ts = replace(plugins_ts, '#flow', null)

	var plugins_flow = replace(plugins_common, '#flow', flow({ pretty: true }))
	plugins_flow = replace(plugins_flow, '#typescript', null)


	var cache

	return (env) =>
	{
		var mode = js_mode(env)

		if (mode !== 'ts')
		{
			var input = env.buckets('index/index.js')
		}
		else
		{
			// TODO fix rollup-plugin-typescript bug
			var prev_dir = process.cwd()
			process.chdir(env.src())

			var input = env.buckets('index/index.ts')
		}

		if (mode === 'ts')
		{
			var plugins = plugins_ts

			plugins = replace(plugins, '#typescript', ts(
			{
				typescript: require('typescript')
			}))
		}
		else
		{
			var plugins = plugins_flow
		}

		plugins = replace(plugins, '#include', include(
		{
			paths: [ env.src(), env.buckets() ],
		}))

		plugins = replace(plugins, '#pug', pug(pug_options(env, input)))

		var metalbox_virtual
		metalbox_virtual = { dev: env.dev || false }
		metalbox_virtual = dump(metalbox_virtual)
		metalbox_virtual = 'export default ' + metalbox_virtual
		plugins = replace(plugins, '#virtual', virtual(
		{
			'@metalbox': metalbox_virtual,
		}))

		plugins = compact(plugins)

		return presolve(rollup.rollup(
		{
			input: input,
			cache: cache,

			plugins: plugins,
		}))
		.then(bundle =>
		{
			cache = bundle

			return bundle.generate(
			{
				format:  'iife',
				exports: 'none',
			})
		})
		.then(bundle => bundle.code)
		.finally(() =>
		{
			if (mode === 'ts')
			{
				// TODO rm
				process.chdir(prev_dir)
			}
		})
	}
}

function replace (plugins, tag, value)
{
	return plugins.map(plugin =>
	{
		if (plugin === tag)
		{
			return value
		}
		else
		{
			return plugin
		}
	})
}

function compact (plugins)
{
	return plugins.filter(Boolean)
}
