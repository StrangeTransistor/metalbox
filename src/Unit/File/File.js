/* @flow */

var assign = Object.assign

import { dirname } from 'path'

import { writeFile as write } from 'fs-extra'
import { copy } from 'fs-extra'
import { move } from 'fs-extra'
import { ensureDir as mkdirp } from 'fs-extra'

import bluebird from 'bluebird'
var join = bluebird.join

import Unit from '../Unit'

import unroll from '../../unroll'

import ensure_abs from './ensure-abs'

/* ::

type $File$Options =
{
	mkdirp: boolean,
}

*/

export default function File /* ::<$in, $prov: $Providers$Base> */
(
	filename /* :$Computable<$in, $prov, string> */,
	content  /* :$Computable<$in, $prov, string> */,
	options  /* :$Shape<$File$Options> */
)
	/* :$Unit<$in, $prov, void> */
{
	var Σoptions = assign({ mkdirp: true }, options)

	return Unit(async (_, context) =>
	{
		var [ Σfilename, Σcontent ] = await join(
			prep_path(context, filename, Σoptions),
			unroll(context, content)
		)

		ensure_abs(Σfilename)

		return write(Σfilename, Σcontent)
	})
}

File.Name = function (filename /* :$Computable<string, any, string> */)
{
	return File(filename, (input /* :string */) => input)
}

File.Copy = function /* ::<$in, $prov: $Providers$Base> */
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

		return copy(Σsrc, Σdst)
	})
}

File.Move = function /* ::<$in, $prov: $Providers$Base> */
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

async function prep_binary_op /* ::<$in, $prov: $Providers$Base> */
(
	context /* :$Context<$in, $prov> */,
	src     /* :$Computable<$in, $prov, string> */,
	dst     /* :$Computable<$in, $prov, string> */,
	options /* :$Shape<$File$Options> */
)
{
	[ src, dst ] = await join(
		unroll(context, src),
		prep_path(context, dst, options)
	)

	ensure_abs(src)
	ensure_abs(dst)

	return [ src, dst ]
}

async function prep_path /* ::<$in, $prov: $Providers$Base> */
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
