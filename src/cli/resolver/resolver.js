/* @flow */
/* ::

export type $Resolver$Fn = (name: string) => string

export type $Resolver<$module> = (name: string) => $module | Symbol

*/

export default function resolver /* ::<$module> */
(
	resolver_fn /* :$Resolver$Fn */
)
	/* :$Resolver<$module> */
{
	return (...args) =>
	{
		try
		{
			/* @flow-off */
			return (require(resolver_fn(...args)) /* :$module */)
		}
		catch (e)
		{
			if (! ('code' in e)) { throw e }
			if (e.code !== 'MODULE_NOT_FOUND') { throw e }

			return Nothing
		}
	}
}

var Nothing = resolver.Nothing = Symbol('Nothing')
