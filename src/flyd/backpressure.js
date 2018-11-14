/* @flow */

import { stream } from 'flyd'

import turnoff from './turnoff'
import onto from './onto'

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

	turnoff(backpressured, reactive)

	onto(reactive.end, () =>
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
	})

	onto(reactive, (value) =>
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
	})

	backpressured.continue = () =>
	{
		if (! backpressured)
		{
			return
		}
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
		backpressured = (null /* :any */)
		reactive = (null /* :any */)
	}

	return backpressured
}
