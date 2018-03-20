/* @flow */

import { resolve } from 'path'

import resolver from './resolver'

export default function (base /* :string */)
{
	return resolver((name /* :string */) =>
	{
		return resolve(base, name)
	})
}
