/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import clc from 'cli-color'
var bold    = clc.bold
var green   = clc.green
var f_error = clc.bold.red

import hr from 'pretty-hrtime'

import { on }  from 'flyd'

import inspect from '../../inspect'

import Context from '../../Context'

import arg_eval from '../arg-eval'

export default async function invoke (
	mini /* :minimistOutput */,
	unit /* :$Unit<any, any, any> */
)
{
	/* @flow-off */
	var unit_input = mini['--'][0]
	unit_input = arg_eval(unit_input)

	var outcome = unit(Context(unit_input))

	// TODO: engine

	if (outcome.stream)
	{
		console.log('Streaming mode.')

		on(proceed, outcome.stream)

		function proceed (value)
		{
			if (value instanceof Error)
			{
				fatal(value)
			}
			else
			{
				console.log(investigate(value))
			}
		}
	}

	try
	{
		var output = await outcome.output
	}
	catch (error)
	{
		// if (! outcome.stream) // shortcutted
		return fatal(error)
	}

	console.log(`${ bold('OK') } (${ green(hr(outcome.time.taken)) }):` +
		` ${ investigate(output) }`)
}

function investigate (output)
{
	if (typeof output === 'object')
	{
		return `\n${ inspect(output) }`
	}
	else
	{
		return `${ output }.`
	}
}

function fatal (error)
{
	console.error(f_error(`Error processing Unit:`))
	console.log(`${ bold(error.name) }: ${ error.message }.`)
	return process.exit(1)
}
