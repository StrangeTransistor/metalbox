/* @flow */

import Rollup from '../../Unit/Rollup/Entry'
import Cjs    from '../../Unit/Rollup/target/Cjs'

import deflow from '../rollup/deflow'
import dets   from '../rollup/dets'

import TsExt from './TsExt'
import Outlander from './Outlander'
import Emptish from './Emptish'
import Iop from './Iop'

export default function Es5 ()
	/* :$Thru<void, any, $File> */
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
	.pipe(Emptish())
	.pipe(Iop())
	.pipe(Outlander())
}
