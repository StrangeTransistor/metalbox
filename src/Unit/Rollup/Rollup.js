/* @flow */
/* ::

import type { Bundle as $Rollup$Bundle } from 'rollup'
import type { Format as $Rollup$Format } from 'rollup'
import type { Exports as $Rollup$Exports } from 'rollup'

*/

var assign = Object.assign

import { rollup } from 'rollup'

import unroll from '../../unroll'
import Entry from '../../Entry'
import Unit from '../Unit'

export default function Rollup /* ::<$in> */
(
	input /* :$Computable<$in, string> */
)
	/* :$Unit<$in, $Entry<$Rollup$Bundle>> */
{
	return Unit(async (context) =>
	{
		var input_u = await unroll(context, input)

		var bundle = await rollup({ input: input_u })

		return Entry(input_u, bundle)
	})
}

export function Generate
(
	format  /* :$Rollup$Format  */,
	exports /* :$Rollup$Exports */,
	options /* :: ?:Object */
)
	/* :$Unit<$Entry<$Rollup$Bundle>, $Entry<$Entry$File>> */
{
	return Unit(async (context) =>
	{
		var entry = context.input
		var bundle /* :$Rollup$Bundle */ = entry.content

		var options_u = assign({}, options,
		{
			format,
			exports,
		})

		var codepair = await bundle.generate(options_u)

		return Entry(entry.filename,
		{
			content:   codepair.code,
			sourcemap: codepair.map
		})
	})
}

export function Cjs ()
{
	return Generate('cjs', 'auto')
}

export function Es6 ()
{
	return Generate('es', 'auto')
}

export function Iife ()
{
	return Generate('iife', 'none')
}
