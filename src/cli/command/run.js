/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import clc from 'cli-color'
var bold = clc.bold
var f_error = clc.bold.red

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
	// TODO: attach runner here if required
	// (to parse opts in corresponding section of cli)
	var name = String(mini._[0] || '')

	var resolved = basic_resolver(name)

	if (resolved === Nothing)
	{
		console.error(f_error(`Unit '${ name }' not found.`))
		return process.exit(1)
	}

	/* @flow-off */
	/* :: resolved = (resolved :[string, string, any]) */

	// TODO: tildify
	console.info(`${ bold('Unit resolved') }: ${ resolved[1] }.`)

	var Unit = resolved[2].default

	var unit_make_args = mini._
	.slice(1)
	.map(arg_eval)

	try
	{
		var unit = Unit(...unit_make_args)
	}
	catch (e)
	{
		console.error(f_error(`Error constructing Unit:`))
		console.log(`${ bold(e.name) }: ${ e.message }.`)
		return process.exit(1)
	}

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
