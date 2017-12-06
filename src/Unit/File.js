/* @flow */

import { isAbsolute as is_abs } from 'path'
import { writeFile  as write }  from 'mz/fs'

import bluebird from 'bluebird'
var join = bluebird.join

import Unit from './Unit'

import unroll from '../unroll'

export default function File /* ::<$in> */
(
	filename /* :$Computable<$in, string> */,
	content  /* :$Computable<$in, string> */
)
	/* :$Unit<$in, void> */
{
	return Unit(async (context) =>
	{
		var filename_u = prep_path(context, filename)
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
	filename /* :$Computable<$in, string> */
)
{
	return unroll(context, filename)
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
