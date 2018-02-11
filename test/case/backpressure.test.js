/* @flow */

import { expect } from 'chai'

import Promise from 'bluebird'
var delay = Promise.delay

import { stream } from 'flyd'

import backpressure from 'src/flyd/backpressure'

describe('backpressure', () =>
{
	it('stores data', async () =>
	{
		var s = stream()
		var b = backpressure(s)

		var b1 = []
		var b2 = []

		var r = delay(25)
		.then(() => s(1))
		.delay(25)
		.then(() => s(2))
		.delay(25)
		.then(() => s(3))
		.delay(25)
		.then(() => s.end(true))

		await r

		s.map(v => b1.push(v))
		b.map(v => b2.push(v))

		s.end.map(() => b1.push('end'))
		b.end.map(() => b2.push('end'))

		b.continue()
		b.continue()
		b.continue()
		b.continue()

		expect(b1).deep.eq([ 3, 'end' ])
		expect(b2).deep.eq([ 1, 2, 3, 'end' ])
	})
})
