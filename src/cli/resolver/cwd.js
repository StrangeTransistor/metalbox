/* @flow */

import { resolve as from_cwd } from 'path'

import resolver from './resolver'

export default function ()
{
	return resolver((name /* :string */) =>
	{
		if (name.match(/^(\.\.\/|\.\/)/))
		{
			return from_cwd(name)
		}
	})
}
