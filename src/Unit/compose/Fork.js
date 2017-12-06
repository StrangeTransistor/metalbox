/* @flow */

import bluebird from 'bluebird'
var join = bluebird.join

import Unit from '../Unit'

export default function Fork /* ::<$in, $out1, $out2> */
(
	u1 /* :$Unit<$in, $out1> */,
	u2 /* :$Unit<$in, $out2> */
)
	/* :$Unit<$in, [ $out1, $out2 ]> */
{
	return Unit(async (context) =>
	{
		var [ a, b ] = await join(u1(context), u2(context))

		return [ a.output, b.output ]
	})
}
