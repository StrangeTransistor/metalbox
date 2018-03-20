/* @flow */

import { resolve } from 'path'

import resolver from './resolver'

export default function ()
{
	return resolver((name /* :string */) =>
	{
		return resolve(name)
	})
}
