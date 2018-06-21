/* @flow */

import { renderFile as pug } from 'pug'

import unroll from '../../unroll'
import Entry  from '../../Entry'

import Unit from '../Unit'

export default function Pug /* ::<$in, $prov: $Providers$Base> */
(
	input   /* :$Computable<$in, $prov, string> */,
	options /* :: ?:Object */
)
	/* :$Unit<$in, $prov, $Entry<$File>> */
{
	return Unit(async (_, context) =>
	{
		var Σinput = await unroll(context, input)

		var content = pug(Σinput, options)

		return Entry(Σinput, { content })
	})
}
