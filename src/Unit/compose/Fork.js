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
		var out1 = u1(context)
		var out2 = u2(context)

		if (out1.stream || out2.stream)
		{
			var s1 = alive(out1)
			var s2 = alive(out2)

			s1 = finalize(s1)
			s2 = finalize(s2)

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

			out1.output.catch(noop)
			out2.output.catch(noop)

			return stream
		}
		else
		{
			return join(out1.output, out2.output)
		}
	})
}
