/* @flow */

var bold = require('cli-color').bold

var findRoot = require('find-root')
var Rootpath = require('rootpath')
var load = require('fs-sync').readJSON

module.exports = () =>
{
	var dir = process.cwd()

	try
	{
		dir = findRoot(process.cwd())
	}
	catch (e)
	{
		console.error(`${bold('package.json')} not found for ${bold(dir)}`)

		process.exit(-1)
	}

	var rootpath = Rootpath(dir)

	var manifest = load(rootpath('package.json'))

	return [ rootpath, manifest ]
}
