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

// TODO pass options from env to plugins, use `object-path`

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
				include(
				{
					paths: [ env.src(), env.src(env.buckets_path) ],
				}),
				globals(),
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
				flow({ pretty: true }),
				pug()
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
