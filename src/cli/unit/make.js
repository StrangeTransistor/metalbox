/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import clc from 'cli-color'
var bold    = clc.bold
var f_error = clc.bold.red

import Unit from '../../Unit'

export default async function make (
	recipe /* :Function */,
	args /* :any[] */
)
	/* :Promise<$Unit<any, any, any>> */
{
	try
	{
		var unit = await recipe(...args)
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
