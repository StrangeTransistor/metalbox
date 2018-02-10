/* @flow */

var noop = () => {}

import bluebird from 'bluebird'
var join = bluebird.join

import { on } from 'flyd'
import { combine } from 'flyd'

import Unit from '../Unit'

import { finalize } from '../../flyd/drain'
import alive from '../../flyd/alive'

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

			on(s1.end, stream.end)
			on(s2.end, stream.end)

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
