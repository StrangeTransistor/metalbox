/* @flow */

import { readFile as read } from 'fs-extra'

import Unit  from '../Unit'
import Entry from '../../Entry'

export default function Load /* ::<$in, $prov: $Providers$Base> */ ()
	/* :$Unit$Entry$Transform<$in, $prov, $Entry$File> */
{
	return Unit(async (entry) =>
	{
		var filename = entry.filename

		var content = await read(filename, 'utf-8')

		return Entry(filename, { content })
	})
}
