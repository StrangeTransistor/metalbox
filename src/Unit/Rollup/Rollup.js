/* @flow */
/* ::

import type { Bundle as $Rollup$Bundle } from 'rollup'

*/

var noop = () => {}
var assign = Object.assign

import { rollup } from 'rollup'

import unroll from '../../unroll'
import Entry  from '../../Entry'

import Unit from '../Unit'

export default function Rollup /* ::<$in, $prov: $Providers$Base> */
(
	input   /* :$Computable<$in, $prov, string> */,
	options /* :: ?:$Shape<$Rollup$Options> */
)
	/* :$Unit<$in, $prov, $Entry<$Rollup$Bundle>> */
{
	return Unit(async (_, context) =>
	{
		var Σinput   = await unroll(context, input)
		var Σoptions = assign({}, options,
		{
			input: Σinput
		})

		if (Σoptions.external === true)
		{
			Σoptions.external = externalize(Σinput)
		}
		if (Σoptions.silent)
		{
			delete Σoptions.silent
			Σoptions.onwarn = noop
		}

		var bundle = await rollup(Σoptions)

		return Entry(Σinput, bundle)
	})
}

function externalize (input)
{
	return (entry) => input !== entry
}
