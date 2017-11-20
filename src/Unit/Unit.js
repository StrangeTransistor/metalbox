/* @flow */

export default function Unit /* ::<$in, $out> */
(
	fn /* :$Fn<$in, $out> */
)
	/* :$Unit<$in, $out> */
{
	return async function (context)
	{
		return { output: await fn(context) }
	}
}
