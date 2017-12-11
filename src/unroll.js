/* @flow */

export default async function unroll
	/* ::<$in, $prov: $Providers$Base, $value> */
(
	context /* :$Context<$in, $prov> */,
	value   /* :$Computable<$in, $prov, $value> */
)
	/* :Promise<$value> */
{
	if (typeof value === 'function')
	{
		return await value(context.input, context)
	}
	else
	{
		return value
	}
}
