/* @flow */

var noop = () => {}

import { combine } from 'flyd'

import bluebird from 'bluebird'
var { join } = bluebird

import Unit from '../Unit'

import alive    from '../../Outcome/alive'

import finalize from '../../flyd/finalize'
import turnoff  from '../../flyd/turnoff'

export default function Fork /* ::<$in, $prov: $Providers$Base, $out1, $out2> */
(
	u1 /* :$Unit<$in, $prov, $out1> */,
	u2 /* :$Unit<$in, $prov, $out2> */
)
	/* :$Unit<$in, $prov, [ $out1, $out2 ]> */
{
	return Unit((_, context) =>
	{
		var r1 = u1(context)
		var r2 = u2(context)

		var s1 = r1.stream
		var s2 = r2.stream

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

		r1.promise.catch(noop)
		r2.promise.catch(noop)

		return stream
	})
}
