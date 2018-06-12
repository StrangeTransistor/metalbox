/* @flow */

import sucrase from 'rollup-plugin-sucrase'

import Rollup from '../Unit/Rollup/Entry'
import Cjs from '../Unit/Rollup/target/Cjs'

import deflow from './deflow'

import TsExt from './TsExt'
import Outlander from './Outlander'
import Emptish from './Emptish'
import Iop from './Iop'

export default function Es5 ()
	/* :$Unit<$Entry<any>, any, $Entry<$Entry$File>> */
{
	var plugins =
	[
		deflow(),
		sucrase({ transforms: [ 'typescript' ] }),
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
