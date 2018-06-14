/* @flow */

import { isAbsolute as is_abs } from 'path'

export default function ensure_abs (filename /* :string */)
{
	if (! is_abs(filename))
	{
		/* TODO error infrastructure */
		throw new TypeError('filename_must_be_absolute_path')
	}
}
