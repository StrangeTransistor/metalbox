/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import clc from 'cli-color'
var bold    = clc.bold
var green   = clc.green
var f_error = clc.bold.red

import hr from 'pretty-hrtime'

import { on }  from 'flyd'

import inspect from '../../inspect'

export default async function invoke (
	unit    /* :$Unit<any, any, any> */,
	context /* :$Context<any, any> */
)
{
	// TODO: context engine

	var outcome = unit(context)

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
		var output = await outcome.promise
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
