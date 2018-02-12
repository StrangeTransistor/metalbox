/* @flow */

import { stream } from 'flyd'

import { expect } from 'chai'

import { either } from 'src/flyd/drain'
import finalize from 'src/flyd/finalize'

describe('finalize drain.either', () =>
{
	it('single error', async () =>
	{
		var s = stream()
		var error = new Error('e')

		s(error)

		var r = await either(finalize(s)).then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})

	it('single error', async () =>
	{
		var error = new Error('e')
		var s = stream(error)

		var r = await either(finalize(s)).then(
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

		var r = await either(finalize(s)).then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})

	it('multiple errors', async () =>
	{
		var s = stream()
		var error = new Error('e')

		setTimeout(() =>
		{
			s(error)
			s(new Error('not'))
			s(new Error('that'))
		})

		var r = await either(finalize(s)).then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})
})
