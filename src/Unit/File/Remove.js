/* @flow */

import { unlink } from 'fs-extra'

import unroll from '../../unroll'

import Unit from '../Unit'

import ensure_abs from './ensure-abs'
import ensure_tmp from './ensure-tmp'

export default function Remove /* ::<$in, $prov: $Providers$Base> */
(
	filename /* :$Computable<$in, $prov, string> */
)
	/* :$Unit<$in, $prov, void> */
{
	return Unit(async (_, context) =>
	{
		var Σfilename = await unroll(context, filename)

		ensure_abs(Σfilename)
		ensure_tmp(Σfilename)

		return unlink(Σfilename)
	})
}
