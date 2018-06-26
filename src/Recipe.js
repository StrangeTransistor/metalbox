/* @flow */
/* ::

type $In = $Iterable<*, *, *>

type $Producer$Unit<$in: $In, $unit_in, $prov: $Providers$Base, $unit_out>
 = $Producer<$in, $Unit<$unit_in, $prov, $unit_out>>

type $Options<$in: $In, $unit_in, $prov: $Providers$Base, $unit_out> =
{
	recipe: $Producer$Unit<$in, $unit_in, $prov, $unit_out>,
}

type $Recipe<$in: $In, $unit_in, $prov: $Providers$Base, $unit_out> =
{
	(...args: $in): Promise<$Unit<$unit_in, $prov, $unit_out>>,
}

*/

import Unit from './Unit'

export default function Recipe
	/* :: <$in: $In, $unit_in, $prov: $Providers$Base, $unit_out> */
(options /* :$Options<$in, $unit_in, $prov, $unit_out> */)
	/* :$Recipe<$in, $unit_in, $prov, $unit_out> */
{
	var recipe = async function (...args /* :$in */)
		/* :Promise<$Unit<$unit_in, $prov, $unit_out>> */
	{
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

Recipe.is = (recipe /* :any */) =>
{
	/* @flow-off */
	return (kind in recipe)
}

var kind = Symbol('Recipe')
