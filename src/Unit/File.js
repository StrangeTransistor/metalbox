/* @flow */

var assign = Object.assign

import { isAbsolute as is_abs } from 'path'
import { dirname } from 'path'

import { writeFile  as write }  from 'mz/fs'

import bluebird from 'bluebird'
var join = bluebird.join

import mkdirp from 'mkdirp-promise'

import Unit from './Unit'

import unroll from '../unroll'

/* ::

type $File$Options =
{
	mkdirp: boolean,
}

*/

export default function File /* ::<$in> */
(
	filename /* :$Computable<$in, string> */,
	content  /* :$Computable<$in, string> */,
	options  /* :$Shape<$File$Options> */
)
	/* :$Unit<$in, void> */
{
	var Σoptions = assign({ mkdirp: true }, options)

	return Unit(async (context) =>
	{
		var filename_u = prep_path(context, filename, Σoptions)
		var content_u  = unroll(context, content)

		; [ filename_u, content_u ] = await join(filename_u, content_u)

		if (! is_abs(filename_u))
		{
			/* TODO error infrastructure */
			throw new TypeError('filename_must_be_absolute_path')
		}

		return write(filename_u, content_u)
	})
}

async function prep_path /* ::<$in> */
(
	context  /* :$Context<$in> */,
	filename /* :$Computable<$in, string> */,
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


File.Name = function (filename /* :$Computable<string, string> */)
{
	return File(filename, (context /* :$Context<string> */) => context.input)
}

File.Entry = function ()
{
	return File(
	(context /* :$Context<$Entry<$Entry$File>> */) =>
	{
		return context.input.filename
	},
	(context /* :$Context<$Entry<$Entry$File>> */) =>
	{
		return context.input.content.content
	})
}
