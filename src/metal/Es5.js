/* @flow */

import Rollup from '../Unit/Rollup/Entry'
import Cjs from '../Unit/Rollup/target/Cjs'

import deflow from './deflow'
import dets from './dets'

import TsExt from './TsExt'
import Outlander from './Outlander'
import Emptish from './Emptish'
import Iop from './Iop'

export default function Es5 ()
	/* :$Unit<$Entry<any>, any, $Entry<$File>> */
{
	var plugins =
	[
		deflow(),
		dets(),
	]

	return Rollup(
	{
		external: true,
		plugins,
	})
	.pipe(Cjs())
	.pipe(TsExt())
	.pipe(Outlander())
	.pipe(Emptish())
	.pipe(Iop())
}
