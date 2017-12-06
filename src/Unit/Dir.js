/* @flow */

var assign = Object.assign

import { isAbsolute as is_abs } from 'path'
import { dirname } from 'path'

import mkdirp from 'mkdirp-promise'

import Unit from './Unit'
import Precursor from './compose/Precursor'

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

/* ::

type $Dir$Entry$Options =
{
	path_dirname: boolean,
}

*/

Dir.Entry = function /* ::<$in: $Entry<*>> */
(
	options /* :$Shape<$Dir$Entry$Options> */
)
	/* :$Unit<$in, void> */
{
	var Σoptions = assign({ path_dirname: true }, options)

	return Dir((context /* :$Context<$in> */) =>
	{
		var filename = context.input.filename

		if (Σoptions.path_dirname)
		{
			filename = dirname(filename)
		}

		return filename
	})
}

Dir.Ensure = function /* ::<$in: $Entry<*>, $out> */
(
	unit /* :$Unit<$in, $out> */
)
	/* :$Unit<$in, $out> */
{
	return Precursor(Dir.Entry(), unit)
}
