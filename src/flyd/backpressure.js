/* @flow */

import { stream } from 'flyd'
import { on } from 'flyd'

export default function backpressure /* ::<$value> */
(
	reactive /* :flyd$Stream<$value> */
)
	/* :flyd$Stream$Backpressure<$value> */
{
	var buffer = []
	var has_ended  = false
	var got_demand = false

	/* @flow-off */
	var backpressured /* :flyd$Stream$Backpressure<$value> */ = stream()

	on(handle_end, reactive.end)
	on(handle, reactive)

	function handle_end ()
	{
		if (has_ended)
		{
			return
		}

		has_ended = true

		if (got_demand)
		{
			finalize()
		}
	}

	function handle (value)
	{
		if (has_ended)
		{
			return
		}
		if (got_demand)
		{
			got_demand = false

			backpressured(value)
		}
		else
		{
			buffer.push(value)
		}
	}

	backpressured.continue = () =>
	{
		if (buffer.length)
		{
			var value = buffer.shift()

			backpressured(value)
		}
		else
		{
			if (has_ended)
			{
				finalize()
			}
			else
			{
				got_demand = true
			}
		}
	}

	function finalize ()
	{
		backpressured.end(true)
		/* @flow-off */
		backpressured = null
		/* @flow-off */
		reactive = null
	}

	return backpressured
}
