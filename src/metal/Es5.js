/* @flow */

import Rollup from '../Unit/Rollup'
import { Cjs } from '../Unit/Rollup'

import deflow from './deflow'
import Outlander from './Outlander'
import Emptish from './Emptish'
import Iop from './Iop'

export default function Es5 ()
	/* :$Unit<$Entry<any>, any, $Entry<$Entry$File>> */
{
	var plugins =
	[
		deflow(),
	]

	return Rollup.Entry(
	{
		external: true,
		plugins,
	})
	.pipe(Cjs())
	.pipe(Outlander())
	.pipe(Emptish())
	.pipe(Iop())
}
