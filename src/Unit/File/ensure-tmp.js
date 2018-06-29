/* @flow */

import { tmpdir } from 'os'
import { contains } from 'node-path-extras'

export default function ensure_tmp (filename /* :string */)
{
	if (! contains(tmpdir(), filename))
	{
		throw new TypeError('filename_must_under_tmpdir')
	}
}
