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
		return await fn(context.input)
	})
}
