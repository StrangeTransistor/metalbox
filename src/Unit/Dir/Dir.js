/* @flow */

import { isAbsolute as is_abs } from 'path'

import { ensureDir as mkdirp } from 'fs-extra'

import unroll from '../../unroll'

import Unit from '../Unit'

export default function Dir /* ::<$in, $prov: $Providers$Base> */
(
	dirname /* :$Computable<$in, $prov, string> */
)
	/* :$Unit<$in, $prov, void> */
{
	return Unit(async (_, context) =>
	{
		var Σdirname = await unroll(context, dirname)

		if (! is_abs(Σdirname))
		{
			/* TODO error infrastructure */
			throw new TypeError('dirname_must_be_absolute_path')
		}

		return await mkdirp(Σdirname)
	})
}
