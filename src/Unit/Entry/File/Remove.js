/* @flow */

import Entry  from '../../../Entry'

import Remove from '../../File/Remove'

export default function ()
{
	return Remove/* :: <*, any> */((entry /* :$Entry<$Remove> */) =>
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
