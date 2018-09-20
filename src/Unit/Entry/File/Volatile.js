/* @flow */

import Entry from '../../../Entry'
import Unit from '../../Unit'

import File from './File'
import Remove from './Remove'

export default function ()
	/* :$Unit<$Entry<$Subtype<$Mutable<$File>>>, any, void> */
{
	var file   = File()
	var remove = Remove()

	return Unit(async (entry, context) =>
	{
		if (entry.content !== Entry.Remove)
		{
			/* @flow-off */
			var context_clean /* :$Context<$Entry<$File>, any> */ = context

			return await file(context_clean).output
		}
		else
		{
			/* @flow-off */
			var context_remove /* :$Context<$Entry<$Remove>, any> */ = context

			return await remove(context_remove).output
		}
	})
}
