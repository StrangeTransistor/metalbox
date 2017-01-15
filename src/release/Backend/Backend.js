/* @flow */

var File = require('../../artifact/File')

var Release = require('../../artifact/Release')

var Manifest = require('../metalbucket/Manifest')

// ---
var rollup = require('rollup')

// var globals  = require('rollup-plugin-node-globals')
// var resolve  = require('rollup-plugin-node-resolve')
// var commonjs = require('rollup-plugin-commonjs')
// var json     = require('rollup-plugin-json')
// var flow     = require('rollup-plugin-flow')

module.exports = function Backend /* ::<Env: EnvBackend & EnvPrinter> */ ()
	/* :T_Release<Env> */
{
	return Release(
	[
		Manifest(),
		File('index.js', (env /* :EnvIn */) =>
		{
			return rollup.rollup(
			{
				entry: env.src('index.js'),

				// external: function () { return true },

				plugins:
				[
					//globals(),
					/*resolve(
					{
						jsnext:  true,
						browser: false,
					}),*/
					/*commonjs(
					{
						sourcemap: false,
						exclude: [ '**' ]
					}),*/
					// json(),
					// flow()
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
					format:  'cjs',
					exports: 'none',
					// TODO moduleName: 'Name'
				})
			})
			.then(bundle => bundle.code)
		})
	])
}
