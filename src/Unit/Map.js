/* @flow */

import Unit from './Unit'

export default function Map /* ::<$in, $out> */
(
	fn /* :$Map$Fn<$in, $out> */
)
	/* :$Unit<$in, $out> */
{
	return Unit(async (context) =>
	{
		var input = context.input

		return await fn(input)
	})
}
