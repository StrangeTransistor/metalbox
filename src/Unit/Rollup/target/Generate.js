/* @flow */
/* ::

import type { Bundle  as $Rollup$Bundle }  from 'rollup'
import type { Format  as $Rollup$Format }  from 'rollup'
import type { Exports as $Rollup$Exports } from 'rollup'

import type { OutputOptions as $Rollup$OutputOptions } from 'rollup'

*/

var assign = Object.assign

import Entry from '../../../Entry'

import Unit from '../../Unit'

export default function Generate
(
	format  /* :$Rollup$Format  */,
	exports /* :$Rollup$Exports */,
	options /* :: ?:$Shape<$Rollup$OutputOptions> */
)
	/* :$Unit<$Entry<$Rollup$Bundle>, any, $Entry<$File>> */
{
	return Unit(async (entry) =>
	{
		var bundle /* :$Rollup$Bundle */ = entry.content

		var Σoptions = assign({}, options,
		{
			format,
			exports,
		})

		var codepair = await bundle.generate(Σoptions)

		return Entry(entry.filename,
		{
			content:   codepair.code,
			sourcemap: codepair.map
		})
	})
}
