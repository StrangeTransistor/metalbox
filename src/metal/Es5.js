/* @flow */

import Rollup from '../Unit/Rollup/Entry'
import Cjs from '../Unit/Rollup/target/Cjs'

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

	return Rollup(
	{
		external: true,
		plugins,
	})
	.pipe(Cjs())
	.pipe(Outlander())
	.pipe(Emptish())
	.pipe(Iop())
}
