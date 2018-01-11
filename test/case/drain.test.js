/* @flow */

import { stream } from 'flyd'

import { expect } from 'chai'

import drain from 'src/drain'

describe('drain', () =>
{
	it('single value', async () =>
	{
		var s = stream()

		s(17)
		s.end(true)

		var r = await drain(s)

		expect(r).eq(17)
	})

	it('single value', async () =>
	{
		var s = stream(17)
		s.end(true)

		var r = await drain(s)

		expect(r).eq(17)
	})

	it('last value', async () =>
	{
		var s = stream()

		s(1)
		s(11)
		s(17)
		s.end(true)

		var r = await drain(s)

		expect(r).eq(17)
	})
})
