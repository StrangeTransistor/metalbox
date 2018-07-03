/* @flow */

import { relative } from 'path'
import { join as absolute } from 'path'

import bluebird from 'bluebird'
var { join } = bluebird

import unroll from '../../unroll'

import Rename  from './Rename'

export default function Rebase /* ::<$content, $prov: $Providers$Base> */
(
	from /* :$Computable<$Entry<$content>, $prov, string> */,
	to   /* :$Computable<$Entry<$content>, $prov, string> */
)
	/* :$Thru<$content, $prov, $content> */
{
	return Rename(async (filename, context) =>
	{
		var [ Σfrom, Σto ] = await join(
			unroll(context, from),
			unroll(context, to)
		)

		return rebase(filename, Σfrom, Σto)
	})
}

function rebase (path, from, to)
{
	return absolute(to, relative(from, path))
}
