/* @flow */

import { inspect } from 'util'

import Unit from './Unit'

var defaults =
{
	colors: true,
	depth: 3,
}

export default function Debug /* ::<$thru, $prov: $Providers$Base>*/ ()
	/* :$Unit<$thru, $prov, $thru> */
{
	return Unit(it =>
	{
		process.stdout.write(inspect(it, defaults))

		return it
	})
}
