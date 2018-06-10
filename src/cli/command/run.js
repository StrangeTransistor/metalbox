/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import clc from 'cli-color'
var bold = clc.bold
var red = clc.red
var f_error = clc.bold.red

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
	var Resolved = resolve(mini)
	var unit = make(mini, Resolved)
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

	var Resolved = resolved[2].default

	if (typeof Resolved !== 'function')
	{
		console.error(red(
			`${ bold('Does not contain a function to create Unit') }: ` +
			`${ resolved[1] }.`))

		/* @flow-off */
		return process.exit(1)
	}

	// TODO: tildify
	console.info(`${ bold('Unit resolved') }: ${ resolved[1] }.`)

	return Resolved
}

function make (mini /* :minimistOutput */, Resolved /* :Function */)
	/* :$Unit<any, any, any> */
{
	var unit_make_args = mini._
	.slice(1)
	.map(arg_eval)

	try
	{
		var unit = Resolved(...unit_make_args)
	}
	catch (e)
	{
		console.error(f_error(`Error constructing Unit:`))
		console.log(`${ bold(e.name) }: ${ e.message }.`)

		/* @flow-off */
		return process.exit(1)
	}

	if (! Unit.is(unit))
	{
		console.error(f_error(`Constructed is not a Unit`))
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

	console.log(`${ bold('OK') }: ${ output }.`)
	// console.log(outcome) // TODO: time
}
