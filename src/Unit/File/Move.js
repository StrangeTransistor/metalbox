/* @flow */

var assign = Object.assign

import { move } from 'fs-extra'

import Unit from '../Unit'

import prep_binary_op from './prep-binary-op'

export default function Move
	/* ::<$in, $prov: $Providers$Base> */
(
	src /* :$Computable<$in, $prov, string> */,
	dst /* :$Computable<$in, $prov, string> */,
	options /* :$Shape<$File$Options> */
)
	/* :$Unit<$in, $prov, void> */
{
	var Σoptions = assign({ mkdirp: true }, options)

	return Unit(async (_, context) =>
	{
		var [ Σsrc, Σdst ] = await prep_binary_op(context, src, dst, Σoptions)

		return move(Σsrc, Σdst)
	})
}
