/* @flow */
/* ::

export type $Resolver$Fn = (name: string) => ?string

export type $Resolver<$module>
 = (name: string) => [ string, string, $module ] | Symbol

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
			var fullname = resolver_fn(...args)

			if (fullname == null)
			{
				return Nothing
			}

			/* @flow-off */
			var mod = (require(fullname) /* :$module */)
		}
		catch (e)
		{
			if (! ('code' in e)) { throw e }
			if (e.code !== 'MODULE_NOT_FOUND') { throw e }

			return Nothing
		}

		return [ fullname, require.resolve(fullname), mod ]
	}
}

export var Nothing = resolver.Nothing = Symbol('Nothing')
