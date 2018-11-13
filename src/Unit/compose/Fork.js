/* @flow */

import { combine } from 'flyd'

import turnoff  from '../../flyd/turnoff'

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
		var s1 = u1(context).alive()
		var s2 = u2(context).alive()

		var stream = combine(handle, [ s1, s2 ])

		function handle (s1, s2, self)
		{
			var v1 = s1()
			var v2 = s2()

			/* cross-ending */
			if ((v1 instanceof Error) || (v2 instanceof Error))
			{
				if (v1 instanceof Error)
				{
					self(v1)
				}
				else
				{
					self(v2)
				}
			}
			else
			{
				self([ v1, v2 ])
			}
		}

		turnoff(stream, s1)
		turnoff(stream, s2)

		return stream
	})
}
