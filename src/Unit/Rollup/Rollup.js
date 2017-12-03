/* @flow */
/* ::

import type { Bundle as $Rollup$Bundle } from 'rollup'

*/

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

/*

			return it.generate(
			{
				format:  'cjs',
				exports: 'auto',
				// sourcemap: true,
			})

*/
