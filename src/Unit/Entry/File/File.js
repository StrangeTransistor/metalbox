/* @flow */

import Entry from '../../../Entry'
import Unit from '../../Unit'

import Add    from './Add'
import Remove from './Remove'

export default function ()
	/* :$Unit<$Entry<$Subtype<$Mutable<$File>>>, any, void> */
{
	var add    = Add()
	var remove = Remove()

	return Unit(async (entry, context) =>
	{
		if (entry.content !== Entry.Remove)
		{
			/* @flow-off */
			var context_clean /* :$Context<$Entry<$File>, any> */ = context

			return await add(context_clean).output
		}
		else
		{
			/* @flow-off */
			var context_remove /* :$Context<$Entry<$Remove>, any> */ = context

			return await remove(context_remove).output
		}
	})
}
