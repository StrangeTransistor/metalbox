/* @flow */
/* ::

type $Let$Fn<
	$in,
	$in_target,
	$prov: $Providers$Base,
	$prov_target: $Providers$Base
>
= $Producer<
	[ $in, $Context<$in, $prov> ],
	$Context<$in_target, $prov_target>
>

declare function Let<
	$in,
	$in_target,
	$prov: $Providers$Base,
	$prov_target: $Providers$Base,
	$out
>
(
	transform: $Let$Fn<$in, $in_target, $prov, $prov_target>,
	target: $Unit<$in_target, $prov_target, $out>
)
: $Unit<$in, $prov, $out>

*/

import Unit from './Unit'

export default function Let (transform, target)
{
	return Unit(async (input, context) =>
	{
		var context = await transform(input, context)

		// @compose
		return target(context).stream
	})
}
