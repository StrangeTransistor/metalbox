/* @flow */

var rollup = require('rollup')

var include  = require('rollup-plugin-includepaths')
var globals  = require('rollup-plugin-node-globals')
var builtins = require('rollup-plugin-node-builtins')
var resolve  = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var json     = require('rollup-plugin-json')
// TODO +pug

module.exports = function Rollup ()
	/* :Producer<EnvFrontend, string> */
{
	return (env) =>
	{
		return rollup.rollup(
		{
			entry: env.src(env.buckets_path, 'index/index.js'),

			plugins:
			[
				// TODO pug
				include(
				{
					paths: [ env.src(), env.src(env.buckets_path) ],
					// TODO external: []
				}),
				globals(),
				builtins(),
				resolve(
				{
					jsnext: true,
					browser: true,
					// TODO skip: []
				}),
				commonjs(
				{
					sourcemap: false
				}),
				json()
			],

			/*
			acorn:
			{
				allowReserved: true
			},
			*/

			// onwarn: console.warn
		})
		.then(bundle =>
		{
			return bundle.generate(
			{
				format: 'iife',
				exports: 'none',
				// TODO moduleName: 'Name'
			})
		})
		.then(bundle => bundle.code)
	}
}
