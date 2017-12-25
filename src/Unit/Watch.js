/* @flow */
/* ::

type $Watch$Options = Object

*/

// var assign = Object.assign

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
	console.log(options)

	return Unit(async (_, context) =>
	{
		var Σglob = await unroll(context, glob)
		Σglob = [].concat(Σglob)

		var ignored =
		[
			dot(),
		]

		var options_w = { ignored }

		var handler = watch(Σglob, options_w)

		handler.on('all', (event, path) =>
		{
			var entry = Entry(path)

			unit(context.derive(entry))
		})
	})
}

function dot ()
{
	return /(^|[/\\])\../
}
