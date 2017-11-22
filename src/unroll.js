/* @flow */

export default async function unroll /* ::<$in, $value> */
(
	context /* :$Context<$in> */,
	value   /* :$Computable<$in, $value> */
)
	/* :Promise<$value> */
{
	if (typeof value === 'function')
	{
		return await value(context)
	}
	else
	{
		return value
	}
}
