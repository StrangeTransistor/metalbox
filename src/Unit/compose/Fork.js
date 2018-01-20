/* @flow */

import bluebird from 'bluebird'
var join = bluebird.join

import lift from 'flyd/module/lift'

import Unit from '../Unit'

import alive from './alive'

export default function Fork /* ::<$in, $prov: $Providers$Base, $out1, $out2> */
(
	u1 /* :$Unit<$in, $prov, $out1> */,
	u2 /* :$Unit<$in, $prov, $out2> */
)
	/* :$Unit<$in, $prov, [ $out1, $out2 ]> */
{
	return Unit((_, context) =>
	{
		var out1 = u1(context)
		var out2 = u2(context)

		if (out1.stream || out2.stream)
		{
			var s1 = alive(out1.stream || out1.output)
			var s2 = alive(out2.stream || out2.output)

			return lift((v1, v2) => [ v1, v2 ], s1, s2)
		}
		else
		{
			return join(out1.output, out2.output)
		}
	})
}
