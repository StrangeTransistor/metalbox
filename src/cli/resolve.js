/* @flow */

import { resolve } from 'path'

export default function (name /* :string */)
{
	console.log(resolve(name))
	console.log(resolve(__dirname + '/..', name))
}
