/* @flow */

import postcss from 'postcss'

import Entry from '../Entry'
import Unit from './Unit'

export default function Postcss (transforms /* :any[] */)
	/* :$Unit$Entry$Transform<$File, any, $File> */
{
	var tr = postcss(transforms)

	return Unit(async (entry) =>
	{
		var filename = entry.filename
		var content  = entry.content.content

		var bundle = await tr.process(content,
		{
			from: filename,
			// map:  entry.map,
		})

		return Entry(filename,
		{
			content:   bundle.css,
			// sourcemap: bundle.map,
		})
	})
}
