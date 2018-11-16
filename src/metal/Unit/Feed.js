/* @flow */

import Unit  from '../../Unit'

import Glob  from '../../Unit/Glob'
import Watch from '../../Unit/Watch'

/* ::

export type $Mode = { live?: boolean, once?: boolean }

declare function Feed<$in, $prov: $Mode, $out>
(
	glob:      $Computable<$in, $prov, $Glob>,
	unit?:    ?$Unit<$Entry<$Mutable<void>>, $prov, $out>,
	options?:  $Shape<$Glob$Options>
)
:$Unit<$in, $prov, $out>

*/

export default function Feed (glob, unit, options)
{
	var G =  Glob(glob, unit, options)
	var W = Watch(glob, unit, options)

	return Unit((_, context) =>
	{
		var { providers: { live, once }} = context
		var is_live = (live && ! once)

		if (is_live)
		{
			var result = W(context)

			return result.stream
		}
		else
		{
			var result = G(context)

			return result.stream
		}
	})
}

// TODO: rm Watch opt
// function ignored (options)
// {
// 	options = { ...options }
// 	options.ignore && (options.ignored = options.ignore)
// 	delete options.ignore
// 	return options
// }
