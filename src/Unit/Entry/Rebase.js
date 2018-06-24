/* @flow */

import { relative } from 'path'
import { join as absolute } from 'path'

import bluebird from 'bluebird'
var join = bluebird.join

import unroll from '../../unroll'

import Entry from '../../Entry'
import Unit  from '../Unit'

export default function Rebase /* ::<$content, $prov: $Providers$Base> */
(
	from /* :$Computable<$Entry<$content>, $prov, string> */,
	to   /* :$Computable<$Entry<$content>, $prov, string> */
)
	/* :$Thru<$content, $prov, $content> */
{
	return Unit(async (entry, context) =>
	{
		var [ Σfrom, Σto ] = await join(
			unroll(context, from),
			unroll(context, to)
		)

		var filename = entry.filename

		filename = rebase(filename, Σfrom, Σto)

		return Entry(filename, entry.content)
	})
}

function rebase (path, from, to)
{
	return absolute(to, relative(from, path))
}
