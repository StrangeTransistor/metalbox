/* @flow */
/* ::

type $Watch$Options = Object

type $Watch$Emit = $Entry<$Mutable<void>>

*/

var assign = Object.assign

import { isAbsolute as is_abs } from 'path'

import { stream } from 'flyd'
import { on } from 'flyd'

import uniq from 'lodash/uniq'

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
		var s /* :flyd$Stream<$out> */ = stream()

		on(release, s.end)

		function release ()
		{
			if (! handler) return

			handler.unwatch()
			handler.close()
		}

		unroll(context, glob)
		.then(raw_glob =>
		{
			var glob = [].concat(raw_glob)
			var base = glob.map(glob_base)

			// var ignored = []

			// if (! Σoptions.dot)
			// {
			// 	ignored.push(/(^|[/\\])\../)
			// }

			// var options_w = { ignored }

			base = uniq(base)
			base = base.filter(path => is_abs(path))

			handler = watch(base /* , options_w */)

			handler.on('all', async (event, path) =>
			{
				if (! match([ path ], glob, Σoptions).length)
				{
					return
				}

				var entry = Entry(path)

				if (event === 'unlink')
				{
					entry.content = Entry.Remove
				}

				// TODO: stream in stream
				var output = await Σunit(context.derive(entry)).promise

				s(output)
			})
		})

		return s
	})
}
