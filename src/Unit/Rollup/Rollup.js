/* @flow */

import { rollup } from 'rollup'

import unroll from '../../unroll'
import Entry from '../../Entry'
import Unit from '../Unit'

export default function Rollup /* ::<$in> */
(
	input /* :$Computable<$in, string> */
)
	/* :$Unit<$in, $Entry> */
{
	return Unit(async (context) =>
	{
		var input_u = await unroll(context, input)

		return rollup({ input: input_u })
		.then(it =>
		{
			// console.log(it)
			return it.generate(
			{
				format:  'cjs',
				exports: 'auto',
				// sourcemap: true,
			})
		})
		.then(bundle =>
		{
			// console.log(input_u)
			// console.log(bundle.map)
			return Entry(input_u, bundle.code)
		})
	})
}
