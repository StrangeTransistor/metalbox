/* @flow */

import { stream } from 'flyd'

import { expect } from 'chai'

import drain from 'src/flyd/drain'
import { either } from 'src/flyd/drain'

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


describe('drain.either', () =>
{
	it('single value', async () =>
	{
		var s = stream()

		s(17)
		s.end(true)

		var r = await either(s)

		expect(r).eq(17)
	})

	it('single value', async () =>
	{
		var s = stream(17)
		s.end(true)

		var r = await either(s)

		expect(r).eq(17)
	})

	it('last value', async () =>
	{
		var s = stream()

		s(1)
		s(11)
		s(17)
		s.end(true)

		var r = await either(s)

		expect(r).eq(17)
	})

	it('single error', async () =>
	{
		var s = stream()
		var error = new Error('e')

		s(error)
		s.end(true)

		var r = await either(s).then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})

	it('single error', async () =>
	{
		var error = new Error('e')
		var s = stream(error)
		s.end(true)

		var r = await either(s).then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})

	it('values then error', async () =>
	{
		var s = stream()
		var error = new Error('e')

		s(1)
		s(11)
		s(17)
		s(error)
		s.end(true)

		var r = await either(s).then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})

	it('multiple errors (without finalization)', async () =>
	{
		var s = stream()
		var error = new Error('e')

		s(new Error('not'))
		s(new Error('that'))
		s(error)
		s.end(true)

		var r = await either(s).then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})
})
