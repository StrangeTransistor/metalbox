/* @flow */

import { unlink } from 'fs-extra'

import Entry  from '../../Entry'
import unroll from '../../unroll'

import Unit from '../Unit'

import ensure_abs from './ensure-abs'

export default function Remove /* ::<$in, $prov: $Providers$Base> */
(
	filename /* :$Computable<$in, $prov, string> */
)
	/* :$Unit<$in, $prov, void> */
{
	return Unit(async (_, context) =>
	{
		var Σfilename = await unroll(context, filename)

		ensure_abs(Σfilename)

		return unlink(Σfilename)
	})
}

Remove.Entry = function ()
{
	return Remove((entry /* :$Entry<$Remove> */) =>
	{
		ensure_remove(entry)

		return entry.filename
	})
}

function ensure_remove (entry /* :$Entry<$Remove> */)
{
	if (entry.content !== Entry.Remove)
	{
		throw new Error('must_be_entry_remove')
	}
}
