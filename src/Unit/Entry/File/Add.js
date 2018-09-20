/* @flow */

import File from '../../File'

export default function ()
{
	return File(
		(entry /* :$Entry<$File> */) => entry.filename,
		(entry /* :$Entry<$File> */) => entry.content.content
	)
}
