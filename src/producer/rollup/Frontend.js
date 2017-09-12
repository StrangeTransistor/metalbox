/* @flow */

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

var js_mode = require('../../release/metalbucket/js-mode')

var pug_options = require('../../release/metalbucket/producer/Pug/options')

// TODO(v2) pass options from env to plugins, use `object-path`

module.exports = function Rollup ()
	/* :Producer<EnvFrontend, string> */
{
	// var cache

	return (env) =>
	{
		var mode = js_mode(env)

		if (mode !== 'ts')
		{
			var input = env.buckets('index/index.js')
		}
		else
		{
			var input = env.buckets('index/index.ts')
		}

		var plugins =
		[
			globals(),
			include(
			{
				paths: [ env.src(), env.buckets() ],
			}),
			builtins(),
		]

		if (mode === 'ts')
		{
			plugins.push(ts(
			{
				typescript: require('typescript')
			}))
		}

		plugins = plugins.concat(
		[
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
			pug(pug_options(env, input)),
		])

		if (mode !== 'ts')
		{
			plugins.push(flow({ pretty: true }))
		}

		return rollup.rollup(
		{
			input: input,
			// cache: cache,

			plugins: plugins,
		})
		.then(bundle =>
		{
			// TODO turn cache on again
			// cache = bundle

			return bundle.generate(
			{
				format:  'iife',
				exports: 'none',
			})
		})
		.then(bundle => bundle.code)
	}
}
