/* @flow */

var assign = Object.assign

import { isAbsolute as is_abs } from 'path'
import { dirname } from 'path'

import { writeFile as write } from 'fs-extra'
import { copy } from 'fs-extra'
import { move } from 'fs-extra'
import { unlink } from 'fs-extra'
import { ensureDir as mkdirp } from 'fs-extra'

import bluebird from 'bluebird'
var join = bluebird.join

import Unit from './Unit'

import Entry from '../Entry'

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

File.Entry = function ()
{
	return File(
		(entry /* :$Entry<$File> */) => entry.filename,
		(entry /* :$Entry<$File> */) => entry.content.content
	)
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


File.Remove = function /* ::<$in, $prov: $Providers$Base> */
(
	filename /* :$Computable<$in, $prov, string> */
)
	/* :$Unit<$in, $prov, void> */
{
	return Unit(async (_, context) =>
	{
		var Σfilename = await unroll(context, filename)

		ensure_abs(Σfilename)

		return unlink(Σfilename)
	})
}

File.Remove.Entry = function ()
{
	return File.Remove((entry /* :$Entry<$Remove> */) =>
	{
		ensure_remove(entry)

		return entry.filename
	})
}

function ensure_remove (entry /* :$Entry<$Remove> */)
{
	if (entry.content !== Entry.Remove)
	{
		throw new Error('must_be_entry_remove')
	}
}

function ensure_abs (filename)
{
	if (! is_abs(filename))
	{
		/* TODO error infrastructure */
		throw new TypeError('filename_must_be_absolute_path')
	}
}
