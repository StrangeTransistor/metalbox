/* @flow */

import Unit from '../Unit'
import Entry from '../Entry'

export default function Emptish ()
	/* :$Unit<$Entry<$Entry$File>, any, $Entry<$Entry$File>> */
{
	var emptish = /\/\*\s*\*\/\n?/g
	var multinw = /\n\n+/g

	return Unit(entry =>
	{
		var content = entry.content.content

		content = content.replace(emptish, '')
		content = content.replace(multinw, '\n\n')

		return Entry(entry.filename,
		{
			content,
			sourcemap: entry.content.sourcemap,
		})
	})
}
