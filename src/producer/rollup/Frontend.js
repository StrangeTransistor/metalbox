/* @flow */

var rollup = require('rollup')

var include  = require('rollup-plugin-includepaths')
var globals  = require('rollup-plugin-node-globals')
var builtins = require('rollup-plugin-node-builtins')
var resolve  = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var json     = require('rollup-plugin-json')
var flow     = require('rollup-plugin-flow')
var pug      = require('rollup-plugin-pug')

var pug_options = require('../../release/metalbucket/producer/Pug/options')

// TODO pass options from env to plugins, use `object-path`

module.exports = function Rollup ()
	/* :Producer<EnvFrontend, string> */
{
	var cache

	return (env) =>
	{
		var entry = env.src(env.buckets_path, 'index/index.js')

		return rollup.rollup(
		{
			entry: entry,
			cache: cache,

			plugins:
			[
				globals(),
				include(
				{
					paths: [ env.src(), env.src(env.buckets_path) ],
				}),
				builtins(),
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
				pug(pug_options(env, entry)),
				flow({ pretty: true }),
			],
		})
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
	}
}
