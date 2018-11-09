/* @flow */

import File from '../../File'

export default function ()
{
	return File/* ::<*, any> */(
		(entry /* :$Entry<$File> */) => entry.filename,
		(entry /* :$Entry<$File> */) => entry.content.content
	)
}
