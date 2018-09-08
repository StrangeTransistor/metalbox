/* @flow */

import tildify from 'tildify'

import clc from 'cli-color'
var bold    = clc.bold
var red     = clc.red
var magenta = clc.magenta
var f_error = clc.bold.red

import Recipe from '../../Recipe'

import { Nothing } from '../resolver/resolver'

import compose from '../resolver/compose'
import cwd  from '../resolver/cwd'
import base from '../resolver/base'

var basic_resolver = compose(
[
	// TODO: package-root/@metalbox (?)
	cwd(),
	base(__dirname + '/../../Unit'), /* metalbox/src/Unit/ */
	base(__dirname + '/../..'),      /* metalbox/src/ */
	base(__dirname + '/../../..'),   /* metalbox/     */
	// TODO: package-root/ (?)
])

export default function resolve (name /* :string */)
	/* :Function */
{
	var resolved = basic_resolver(name)

	if (resolved === Nothing)
	{
		console.error(f_error(`Unit '${ name }' not found.`))

		/* @flow-off */
		return process.exit(1)
	}

	/* @flow-off */
	/* :: resolved = (resolved :[string, string, any]) */

	var resolved_filename_tilde = tildify(resolved[1])
	var recipe = resolved[2].default

	if (typeof recipe !== 'function')
	{
		console.error(red(
		`${
			bold('Does not contain a Recipe or a simple function to create Unit')
		}: ${ resolved_filename_tilde }.`))

		/* @flow-off */
		return process.exit(1)
	}

	var kind = 'Recipe'

	if (! Recipe.is(recipe))
	{
		console.error(magenta(`Working with simple function as a Recipe.`))
		kind = 'Unit'
	}

	console.info(`${ bold(kind + ' resolved') }: ${ resolved_filename_tilde }.`)

	return recipe
}
