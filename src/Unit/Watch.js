/* @flow */
/* ::

type $Watch$Options = Object

*/

var assign = Object.assign

import { stream } from 'flyd'
import { on } from 'flyd'

import { watch } from 'chokidar'

import unroll from '../unroll'

import Entry from '../Entry'

import Unit from './Unit'

export default function Glob /* ::<$in, $prov: $Providers$Base, $out> */
(
	glob /* :$Computable<$in, $prov, $Glob> */,
	unit /* :$Unit<$Entry<void>, $prov, $out> */,
	options /* :: ?:$Shape<$Watch$Options> */
)
	/* :$Unit<$in, $prov, $out> */
{
	var Σoptions = assign({}, options)

	return Unit((_, context) =>
	{
		var handler

		/* @flow-off */
		var live /* :flyd$Stream<$out> */ = stream()

		on(release, live.end)

		function release ()
		{
			if (! handler) return

			/* @flow-off */
			handler.unwatch()

			/* @flow-off */
			handler.close()
		}

		unroll(context, glob)
		.then(glob =>
		{
			glob = [].concat(glob)

			var ignored = []

			if (! Σoptions.dot)
			{
				ignored.push(dot())
			}

			var options_w = { ignored }

			handler = watch(glob, options_w)

			handler.on('all', async (event, path) =>
			{
				var entry = Entry(path)
				var context_entry = context.derive(entry)
				context_entry.live = true

				var output = await unit(context_entry).output

				live(output)
			})
		})

		return live
	})
}

function dot ()
{
	return /(^|[/\\])\../
}
