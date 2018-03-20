/* @flow */
/* ::

import type { $Resolver } from './resolver'

*/

import { Nothing } from './resolver'

export default function /*::<$module> */ (resolvers /* :$Resolver<$module>[] */)
	/* :$Resolver<$module> */
{
	return (name /* :string */) =>
	{
		for (let resolver of resolvers)
		{
			let result = resolver(name)

			if (result !== Nothing)
			{
				return result
			}
		}

		return Nothing
	}
}
