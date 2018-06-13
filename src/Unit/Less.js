/* @flow */

import less from 'less'

import Unit  from '../Unit'
import Entry from '../Entry'

export default function Less
	/* ::<$in: $Entry<$Entry$File>, $prov: $Providers$Base> */
()
	/* :$Unit<$in, $prov, $Entry<$Entry$File>> */
{
	return Unit(async (entry) =>
	{
		var content = entry.content.content

		var bundle = await less.render(content)

		return Entry(entry.filename,
		{
			content:   bundle.css,
			sourcemap: bundle.map,
		})
	})
}
