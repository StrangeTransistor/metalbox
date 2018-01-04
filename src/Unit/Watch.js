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
	/* :$Unit<$in, $prov, void> */
{
	options = assign({}, options)
	console.log(options)

	return Unit(async (_, context) =>
	{
		var live = stream()

		var Σglob = await unroll(context, glob)
		Σglob = [].concat(Σglob)

		var ignored =
		[
			dot(),
		]

		var options_w = { ignored }

		var handler = watch(Σglob, options_w)

		handler.on('all', async (event, path) =>
		{
			var entry = Entry(path)
			var context_entry = context.derive(entry)
			context_entry.live = true

			var output = await unit(context_entry).output

			live(output)
		})

		on(release, live.end)

		function release ()
		{
			/* @flow-off */
			handler.unwatch()

			/* @flow-off */
			handler.close()
		}

		// return live
	})
}

function dot ()
{
	return /(^|[/\\])\../
}
