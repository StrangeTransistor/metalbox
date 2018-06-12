/* @flow */

import sucrase from 'rollup-plugin-sucrase'

import Unit from '../Unit'
import Entry from '../Entry'

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
		sucrase({ transforms: [ 'typescript' ] }),
	]

	return Rollup(
	{
		external: true,
		plugins,
	})
	.pipe(Cjs())
	.pipe(Mvts())
	.pipe(Outlander())
	.pipe(Emptish())
	.pipe(Iop())
}

function Mvts /* ::<T> */ ()
	/* :$Unit<$Entry<T>, any, $Entry<T>> */
{
	return Unit(entry =>
	{
		var filename = entry.filename.replace(/\.ts$/, '.js')

		return Entry(filename, entry.content)
	})
}
