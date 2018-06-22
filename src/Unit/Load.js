/* @flow */

import { readFile as read } from 'fs-extra'

import unroll from '../unroll'
import Entry  from '../Entry'

import Unit from './Unit'

export default function Load /* ::<$in, $prov: $Providers$Base> */
(
	filename /* :$Computable<$in, $prov, string> */
)
	/* :$Unit<$in, $prov, $Entry<$File>> */
{
	return Unit(async (_, context) =>
	{
		var Σfilename = await unroll(context, filename)

		var content = await read(Σfilename, 'utf-8')

		return Entry(Σfilename, { content })
	})
}
