/* @flow */

import Unit  from '../../Unit'

import Glob  from '../../Unit/Glob'
import Watch from '../../Unit/Watch'

/* ::

type $Demands<T> = { providers: $Providers<$Subtype<T>> }

type $Mode = $Demands<{ live?: boolean, once?: boolean }>

declare function Feed<$in, $prov: $Providers$Base, $out>
(
	glob:      $Computable<$in, $prov, $Glob>,
	unit?:    ?$Unit<$Entry<$Mutable<void>>, $prov, $out>,
	options?:  $Shape<$Glob$Options>
)
:$Unit<$in, $prov & $Mode, $out>

*/

export default function Feed (glob, unit, options)
{
	var G =  Glob(glob, unit, options)
	var W = Watch(glob, unit, ignored(options))

	return Unit((_, context) =>
	{
		var { providers: { live, once }} = context
		var so_watch = (live && ! once)

		if (so_watch)
		{
			var outcome = W(context)

			return outcome.return
		}
		else
		{
			var outcome = G(context)

			return outcome.return
		}
	})
}

/* $Unit<$Entry<$Subtype<$Mutable<$File>>>, any, void> */

function ignored (options)
{
	options = { ...options }
	options.ignore && (options.ignored = options.ignore)
	delete options.ignore
	return options
}