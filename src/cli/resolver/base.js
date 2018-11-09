/* @flow */

import { resolve as from_base } from 'path'

import resolver from './resolver'

/* ::

import type { $Resolver } from './resolver'

*/

export default function (base /* :string */)
	/* :$Resolver<any> */
{
	return resolver((name /* :string */) =>
	{
		return from_base(base, name)
	})
}
