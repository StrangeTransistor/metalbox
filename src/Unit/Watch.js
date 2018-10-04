/* @flow */
/* ::

type $Watch$Options = Object

type $Watch$Emit = $Entry<$Mutable<void>>

*/

var assign = Object.assign

import { stream } from 'flyd'
import { on } from 'flyd'

import { watch } from 'chokidar'
import glob_base from 'glob-parent'
import match from 'micromatch'

import unroll from '../unroll'

import Entry from '../Entry'

import Unit from './Unit'
import cast from './_/cast'

export default function Watch /* ::<$in, $prov: $Providers$Base, $out> */
(
	glob /* :$Computable<$in, $prov, $Glob> */,
	unit /* :: ?:?$Unit<$Watch$Emit, $prov, $out> */,
	options /* :: ?:$Shape<$Watch$Options> */
)
	/* :$Unit<$in, $prov, $out> */
{
	var Σunit = cast(unit)
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

			handler.unwatch()
			handler.close()
		}

		unroll(context, glob)
		.then(glob =>
		{
			glob = [].concat(glob)
			var base = glob.map(glob_base)

			// var ignored = []

			// if (! Σoptions.dot)
			// {
			// 	ignored.push(/(^|[/\\])\../)
			// }

			// var options_w = { ignored }

			handler = watch(base /* , options_w */)

			handler.on('all', async (event, path) =>
			{
				if (! match([ path ], glob, Σoptions).length)
				{
					return
				}

				var entry = Entry(path)
				var context_entry = context.derive(entry)
				context_entry.live = true

				if (event === 'unlink')
				{
					entry.content = Entry.Remove
				}

				// TODO: stream in stream
				var output = await Σunit(context_entry).output

				live(output)
			})
		})

		return live
	})
}
