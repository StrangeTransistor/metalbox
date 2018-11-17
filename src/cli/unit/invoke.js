/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import clc from 'cli-color'
var bold    = clc.bold
var green   = clc.green
var f_error = clc.bold.red

import hr from 'pretty-hrtime'

import onto from '../../flyd/onto'

import inspect from '../../inspect'

export default async function invoke (
	unit    /* :$Unit<any, any, any> */,
	context /* :$Context<any, any> */
)
{
	// TODO: context engine

	var result = unit(context)

	onto(result.stream, (value) =>
	{
		if (value instanceof Error)
		{
			fatal(value)
		}
		else
		{
			console.log('~', investigate(value))
		}
	})

	try
	{
		var output = await result.promise
	}
	catch (error)
	{
		return fatal(error)
	}

	console.log(`${ bold('OK') } (${ green(hr(result.time.taken)) }):` +
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
