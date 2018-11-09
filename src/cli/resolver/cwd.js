/* @flow */

import { resolve as from_cwd } from 'path'

import resolver from './resolver'

/* ::

import type { $Resolver } from './resolver'

*/

export default function ()
	/* :$Resolver<any> */
{
	return resolver((name /* :string */) =>
	{
		if (name.match(/^(\.\.\/|\.\/)/))
		{
			return from_cwd(name)
		}
	})
}
