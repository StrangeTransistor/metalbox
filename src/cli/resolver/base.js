/* @flow */

import { resolve as from_base } from 'path'

import resolver from './resolver'

export default function (base /* :string */)
{
	return resolver((name /* :string */) =>
	{
		return from_base(base, name)
	})
}
