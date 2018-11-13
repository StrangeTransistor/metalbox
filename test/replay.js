/* @flow */

import { stream } from 'flyd'

import Promise from 'bluebird'

var { mapSeries: map } = Promise
var { delay } = Promise

export default function replay (seq /* :any[] */)
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
