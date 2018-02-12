/* @flow */
/* eslint-disable max-statements */

import { expect } from 'chai'

import Promise from 'bluebird'
var delay = Promise.delay

import { stream } from 'flyd'

import backpressure from 'src/flyd/backpressure'

describe('backpressure', () =>
{
	function track_pair (s, b)
	{
		var bs = []
		var bb = []

		s.map(value => bs.push(value))
		b.map(value => bb.push(value))

		s.end.map(() => bs.push('end'))
		b.end.map(() => bb.push('end'))

		return [ bs, bb ]
	}

	it('stores data', async () =>
	{
		var s = stream()
		var b = backpressure(s)

		var [ b_s1, b_b1 ] = track_pair(s, b)

		await delay(25)
		.then(() => s(1))
		.delay(25)
		.then(() => s(2))
		.delay(25)
		.then(() => s(3))
		.delay(25)
		.then(() => s.end(true))

		var [ b_s2, b_b2 ] = track_pair(s, b)

		b.continue()
		b.continue()
		b.continue()
		b.continue()

		expect(b_s1).deep.eq([ 1, 2, 3, 'end' ])
		expect(b_b1).deep.eq([ 1, 2, 3, 'end' ])

		expect(b_s2).deep.eq([ 3, 'end' ])
		expect(b_b2).deep.eq([ 1, 2, 3, 'end' ])
	})

	it('stores data (init value)', async () =>
	{
		var s = stream(0)
		var b = backpressure(s)

		var [ b_s1, b_b1 ] = track_pair(s, b)

		await delay(25)
		.then(() => s(1))
		.delay(25)
		.then(() => s(2))
		.delay(25)
		.then(() => s(3))
		.delay(25)
		.then(() => s.end(true))

		var [ b_s2, b_b2 ] = track_pair(s, b)

		b.continue()
		b.continue()
		b.continue()
		b.continue()
		b.continue()

		expect(b_s1).deep.eq([ 0, 1, 2, 3, 'end' ])
		expect(b_b1).deep.eq([ 0, 1, 2, 3, 'end' ])

		expect(b_s2).deep.eq([ 3, 'end' ])
		expect(b_b2).deep.eq([ 0, 1, 2, 3, 'end' ])
	})

	it('ends backforward', () =>
	{
		var s = stream()
		var b = backpressure(s)

		var has_ended = false

		s.end.map(v => { has_ended = v })

		b.end(true)

		expect(has_ended).true
	})
})
