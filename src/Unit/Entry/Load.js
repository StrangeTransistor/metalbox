/* @flow */

import Load from '../Load'

export default function ()
{
	return Load((entry /* :$Entry<void> */) =>
	{
		ensure_void(entry)

		return entry.filename
	})
}

function ensure_void (entry)
{
	if (entry.content != null)
	{
		throw new TypeError('load expect Entry<void>')
	}
}
