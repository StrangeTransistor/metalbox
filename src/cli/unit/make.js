/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import clc from 'cli-color'
var bold    = clc.bold
var f_error = clc.bold.red

import Unit from '../../Unit'

import arg_eval from '../arg-eval'

export default async function make (
	mini /* :minimistOutput */,
	recipe /* :Function */
)
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
		console.error(f_error(`Constructed value is not a Unit.`))
		console.log(unit)

		/* @flow-off */
		return process.exit(1)
	}

	return unit
}
