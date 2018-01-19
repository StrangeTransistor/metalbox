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
	return Unit((_, context) =>
	{
		var out1 = u1(context)
		var out2 = u2(context)

		if (out1.stream || out2.stream)
		{
			/* @flow-off */
			return
		}
		else
		{
			return join(out1.output, out2.output)
		}
	})
}
