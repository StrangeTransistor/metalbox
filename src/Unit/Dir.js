/* @flow */

var assign = Object.assign

import { isAbsolute as is_abs } from 'path'
import { dirname } from 'path'

import mkdirp from 'mkdirp-promise'

import Unit from './Unit'
import Precursor from './compose/Precursor'

import unroll from '../unroll'

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

/* ::

type $Dir$Entry$Options =
{
	path_dirname: boolean,
}

*/

Dir.Entry = function /* ::<$in: $Entry<*>, $prov: $Providers$Base> */
(
	options /* :$Shape<$Dir$Entry$Options> */
)
	/* :$Unit<$in, $prov, void> */
{
	var Σoptions = assign({ path_dirname: true }, options)

	return Dir((entry /* :$in */) =>
	{
		var filename = entry.filename

		if (Σoptions.path_dirname)
		{
			filename = dirname(filename)
		}

		return filename
	})
}

Dir.Ensure = function /* ::<$in: $Entry<*>, $prov: $Providers$Base, $out> */
(
	unit /* :$Unit<$in, $prov, $out> */
)
	/* :$Unit<$in, $prov, $out> */
{
	return Precursor(Dir.Entry(), unit)
}
