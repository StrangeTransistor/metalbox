/* @flow */
/* ::

type $In = $Iterable<*, *, *>

type $Producer$Unit<$in: $In, $unit_in, $prov: $Providers$Base, $unit_out>
 = $Producer<$in, $Unit<$unit_in, $prov, $unit_out>>

type $Options<$in: $In, $unit_in, $prov: $Providers$Base, $unit_out> =
{
	recipe: $Producer$Unit<$in, $unit_in, $prov, $unit_out>,
	args?: Function[],
}

type $Recipe<$in: $In, $unit_in, $prov: $Providers$Base, $unit_out> =
{
	(...args: $in): Promise<$Unit<$unit_in, $prov, $unit_out>>,
}

*/

var max = Math.max

import tcomb from './tcomb'
import Unit  from './Unit'

export default function Recipe
	/* :: <$in: $In, $unit_in, $prov: $Providers$Base, $unit_out> */
(options /* :$Options<$in, $unit_in, $prov, $unit_out> */)
	/* :$Recipe<$in, $unit_in, $prov, $unit_out> */
{
	var recipe = async function (...args /* :$in */)
		/* :Promise<$Unit<$unit_in, $prov, $unit_out>> */
	{
		val_args(options.args, args)

		var unit = await options.recipe(...args)

		if (! Unit.is(unit))
		{
			throw new TypeError('Recipe must construct Unit.')
		}

		return unit
	}

	/* @flow-off */
	recipe[kind] = null

	return recipe
}

function val_args (vals, args)
{
	var Σvals = (vals || [])
	/* @flow-off */
	var Σargs = (args /* :any[] */)

	var L = max(Σvals.length, Σargs.length)

	for (let i = 0; i < L; i++)
	{
		let val = (Σvals[i] || tcomb.Never)
		let arg =  Σargs[i]

		console.log(val, arg)

		val(arg)
	}
}

Recipe.is = (recipe /* :any */) =>
{
	/* @flow-off */
	return (kind in recipe)
}

var kind = Symbol('Recipe')
