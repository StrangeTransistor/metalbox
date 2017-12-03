/* @flow */

import { relative } from 'path'
import { join as absolute } from 'path'

import bluebird from 'bluebird'
var join = bluebird.join

import unroll from '../unroll'

import Entry from '../Entry'
import Unit from './Unit'

export default function Rebase /* ::<$content> */
(
	from /* :$Computable<$Entry<$content>, string> */,
	to   /* :$Computable<$Entry<$content>, string> */
)
	/* :$Unit<$Entry<$content>, $Entry<$content>> */
{
	return Unit(async (context) =>
	{
		var Σfrom = await unroll(context, from)
		var Σto   = await unroll(context, to)

		; [ Σfrom, Σto ] = await join(Σfrom, Σto)

		var entry = context.input
		var filename = entry.filename

		filename = rebase(filename, Σfrom, Σto)

		return Entry(filename, entry.content)
	})
}

function rebase (path, from, to)
{
	return absolute(to, relative(from, path))
}
