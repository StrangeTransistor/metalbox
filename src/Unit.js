/* @flow */

export default function Unit /* ::<$product> */
(
	fn /* :$Fn<$product> */
)
	/* :$Unit<$product> */
{
	return async function (context)
	{
		return { value: await fn(context) }
	}
}
