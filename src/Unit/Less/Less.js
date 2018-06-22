/* @flow */

import less  from 'less'

import Entry from '../../Entry'
import Unit  from '../Unit'

export default function Less ()
	/* :$Unit<$Entry<$File>, any, $Entry<$File>> */
{
	return Unit(async (entry) =>
	{
		var filename = entry.filename
		var content  = entry.content.content

		var bundle = await less.render(content,
		{
			filename,
		})

		return Entry(entry.filename,
		{
			content:   bundle.css,
			sourcemap: bundle.map,
		})
	})
}
