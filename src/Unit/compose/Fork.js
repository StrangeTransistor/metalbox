/* @flow */

import bluebird from 'bluebird'
var join = bluebird.join

import Unit from '../Unit'

export default function Fork /* ::<$in, $prov: $Providers$Base, $out1, $out2> */
(
	u1 /* :$Unit<$in, $prov, $out1> */,
	u2 /* :$Unit<$in, $prov, $out2> */
)
	/* :$Unit<$in, $prov, [ $out1, $out2 ]> */
{
	return Unit(async (_, context) =>
	{
		var [ a, b ] = await join(u1(context), u2(context))

		/* TODO: compose outcome */
		return [ a.output, b.output ]
	})
}
