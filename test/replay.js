/* @flow */

import { stream } from 'flyd'

import { mapSeries as map } from 'bluebird'
import { delay } from 'bluebird'

export default function replay (seq)
{
	var s = stream()

	map(seq, (value) =>
	{
		return delay(25).then(() => s(value))
	})
	.then(() =>
	{
		return delay(25).then(() => s.end(true))
	})

	return s
}
