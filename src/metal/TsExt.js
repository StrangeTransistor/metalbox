/* @flow */

import Unit from '../Unit'
import Entry from '../Entry'

export default function TsExt /* ::<T> */ ()
	/* :$Unit<$Entry<T>, any, $Entry<T>> */
{
	return Unit(entry =>
	{
		var filename = entry.filename.replace(/\.ts$/, '.js')

		return Entry(filename, entry.content)
	})
}
