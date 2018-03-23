/* @flow */

import { resolve } from 'path'

import resolver from './resolver'

export default function ()
{
	return resolver((name /* :string */) =>
	{
		if (name.match(/^(\.\.\/|\.\/)/))
		{
			return resolve(name)
		}
	})
}
