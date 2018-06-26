/* @flow */

import { inspect } from 'util'

var options =
{
	colors: true,
	depth: 2,
}

export default function (it /* :any */)
{
	return inspect(it, options)
}
