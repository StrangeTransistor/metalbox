/* @flow */

var assign = Object.assign

import { isAbsolute as is_abs } from 'path'
import { dirname } from 'path'

import { writeFile as write } from 'fs-extra'
import { copy } from 'fs-extra'
import { ensureDir as mkdirp } from 'fs-extra'

import bluebird from 'bluebird'
var join = bluebird.join

import Unit from './Unit'

import unroll from '../unroll'

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
		var Σfilename = prep_path(context, filename, Σoptions)
		var Σcontent  = unroll(context, content)

		; [ Σfilename, Σcontent ] = await join(Σfilename, Σcontent)

		ensure_abs(Σfilename)

		return write(Σfilename, Σcontent)
	})
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

async function prep_binary_op /* ::<$in, $prov: $Providers$Base> */
(
	context /* :$Context<$in, $prov> */,
	src /* :$Computable<$in, $prov, string> */,
	dst /* :$Computable<$in, $prov, string> */,
	options /* :$Shape<$File$Options> */
)
{
	var Σsrc = unroll(context, src)
	var Σdst = prep_path(context, dst, options)

	; [ Σsrc, Σdst ] = await join(Σsrc, Σdst)

	ensure_abs(Σsrc)
	ensure_abs(Σdst)

	return [ Σsrc, Σdst ]
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

function ensure_abs (filename)
{
	if (! is_abs(filename))
	{
		/* TODO error infrastructure */
		throw new TypeError('filename_must_be_absolute_path')
	}
}


File.Name = function (filename /* :$Computable<string, any, string> */)
{
	return File(filename, (input /* :string */) => input)
}

File.Entry = function ()
{
	return File(
		(entry /* :$Entry<$Entry$File> */) => entry.filename,
		(entry /* :$Entry<$Entry$File> */) => entry.content.content
	)
}
