/* @flow */

var assign = Object.assign

import { isAbsolute as is_abs } from 'path'
import { dirname } from 'path'

import { writeFile  as write } from 'fs-extra'

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

		if (! is_abs(Σfilename))
		{
			/* TODO error infrastructure */
			throw new TypeError('filename_must_be_absolute_path')
		}

		return write(Σfilename, Σcontent)
	})
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
