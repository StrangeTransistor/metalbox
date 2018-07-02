/* @flow */

import { dirname } from 'path'

import { ensureDir as mkdirp } from 'fs-extra'

import unroll from '../../unroll'

export default async function prep_path
	/* ::<$in, $prov: $Providers$Base> */
(
	context  /* :$Context<$in, $prov> */,
	filename /* :$Computable<$in, $prov, string> */,
	options  /* :$File$Options */
)
{
	var Σfilename = await unroll(context, filename)

	if (options.mkdirp)
	{
		await mkdirp(dirname(Σfilename))
	}

	return Σfilename
}
