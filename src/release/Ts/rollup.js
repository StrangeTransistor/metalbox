/* @flow */

var rollup = require('rollup')

// var include  = require('rollup-plugin-includepaths')
var globals  = require('rollup-plugin-node-globals')
var builtins = require('rollup-plugin-node-builtins')
var resolve  = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var json     = require('rollup-plugin-json')
// var flow     = require('rollup-plugin-flow')
var ts = require('rollup-plugin-typescript')


module.exports = function Rollup ()
	/* :Producer<EnvFrontend, string> */
{
	return (env) =>
	{
		return rollup.rollup(
		{
			// entry: env.src(env.buckets_path, 'index/index.js'),
			entry: env.src('index.ts'),

			plugins:
			[
				/*include(
				{
					paths: [ env.src(), env.src(env.buckets_path) ],
				}),*/
				globals(),
				builtins(),
				ts(
				{
					typescript: require('typescript')
				}),
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
				// flow({ pretty: true }),
			],

			/*
			acorn:
			{
				allowReserved: true
			},
			*/
		})
		.then(bundle =>
		{
			return bundle.generate(
			{
				format:  'iife',
				exports: 'none',
			})
		})
		.then(bundle => bundle.code)
	}
}
