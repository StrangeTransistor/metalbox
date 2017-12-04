/* @flow */

import { isAbsolute as is_abs } from 'path'

import mkdirp from 'mkdirp-promise'

import Unit from './Unit'

import unroll from '../unroll'

export default function Dir /* ::<$in> */
(
	dirname /* :$Computable<$in, string> */
)
	/* :$Unit<$in, void> */
{
	return Unit(async (context) =>
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
