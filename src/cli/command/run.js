/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import clc from 'cli-color'
var bold    = clc.bold
var red     = clc.red
var green   = clc.green
var magenta = clc.magenta
var f_error = clc.bold.red

import tildify from 'tildify'

import hr from 'pretty-hrtime'

import inspect from '../../inspect'

import Recipe from '../../Recipe'
import Unit from '../../Unit'

import compose from '../resolver/compose'
import cwd  from '../resolver/cwd'
import base from '../resolver/base'

import { Nothing } from '../resolver/resolver'

import Context from '../../Context'

import arg_eval from '../arg-eval'

var basic_resolver = compose(
[
	cwd(),
	base(__dirname + '/../../Unit'), /* metalbox/src/Unit/ */
	base(__dirname + '/../..'),      /* metalbox/src/ */
	base(__dirname + '/../../..'),   /* metalbox/     */
])

export default async function (mini /* :minimistOutput */)
{
	var recipe = resolve(mini)
	var unit = await make(mini, recipe)
	return await invoke(mini, unit)
}

function resolve (mini /* :minimistOutput */)
	/* :Function */
{
	// TODO: attach runner here if required
	// (to parse opts in corresponding section of cli)
	var name = String(mini._[0] || '')

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
	if (! Recipe.is(recipe))
	{
		console.error(magenta(`Working with simple function as a Recipe.`))
	}

	console.info(`${ bold('Unit resolved') }: ${ resolved_filename_tilde }.`)

	return recipe
}

async function make (mini /* :minimistOutput */, recipe /* :Function */)
	/* :Promise<$Unit<any, any, any>> */
{
	var unit_make_args = mini._
	.slice(1)
	.map(arg_eval)

	try
	{
		var unit = await recipe(...unit_make_args)
	}
	catch (e)
	{
		console.error(f_error(`Error constructing Recipe:`))
		console.log(`${ bold(e.name) }: ${ e.message }.`)

		/* @flow-off */
		return process.exit(1)
	}

	if (! Unit.is(unit))
	{
		// TODO:
		// will catch if recipe is not an Recipe, but a simple function
		console.error(f_error(`Constructed is not a Unit.`))
		console.log(unit)

		/* @flow-off */
		return process.exit(1)
	}

	return unit
}

async function invoke (
	mini /* :minimistOutput */,
	unit /* :Unit<any, any, any> */
)
{
	/* @flow-off */
	var unit_input = mini['--'][0]
	unit_input = arg_eval(unit_input)

	try
	{
		var outcome = unit(Context(unit_input))

		var output = await outcome.output
	}
	catch (e)
	{
		console.error(f_error(`Error processing Unit:`))
		console.log(`${ bold(e.name) }: ${ e.message }.`)
		return process.exit(1)
	}

	if (typeof output === 'object')
	{
		var inspected = `\n${ inspect(output) }`
	}
	else
	{
		var inspected = `${ output }.`
	}

	console.log(`${ bold('OK') } (${ green(hr(outcome.time.taken)) }):` +
		` ${ inspected }`)
}
