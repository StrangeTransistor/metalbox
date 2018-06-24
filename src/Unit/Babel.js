/* @flow */

import { transform } from 'babel-core'

import Entry from '../Entry'
import Unit  from './Unit'

export default function Babel (options /* ::?:Object */)
	/* :$Thru<$File, any, $File> */
{
	return Unit(entry =>
	{
		var filename = entry.filename
		var content  = entry.content.content

		var result = transform(content, options) // { code, map, ast }

		return Entry(filename,
		{
			content:   result.code,
			// sourcemap: result.map,
		})
	})
}
