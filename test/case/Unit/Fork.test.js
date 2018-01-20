/* @flow */

import { expect } from 'chai'

import Promise from 'bluebird'
var delay = Promise.delay

import { stream } from 'flyd'

import { concat } from 'src/drain'

import Unit from 'src/Unit'
import Fork from 'src/Unit/compose/Fork'

import Context from 'src/Context'

describe('Fork', () =>
{
	it('Fork(u1, u2)', async () =>
	{
		var u1 = Unit((_, context) =>
		{
			var x /* :number */ = context.input.x + 2
			return { x }
		})

		var u2 = Unit(input =>
		{
			var x /* :number */ = input.x

			return { y: x + 12 }
		})

		var u = Fork(u1, u2)

		var context = Context({ x: 5 })

		var output = await u(context).output

		expect(output).deep.eq([ { x: 7 }, { y: 17 } ])
	})

	it('Fork(u1, u2) throw', async () =>
	{
		var u1 = Unit(() =>
		{
			throw new Error('no_pass')
		})

		var u2 = Unit((_, context) =>
		{
			var x /* :number */ = context.input.x

			return { y: x + 2 }
		})

		var u = Fork(u1, u2)

		var context = Context({ x: 5 })

		await expect(u(context).output)
		.rejectedWith('no_pass')
	})

	it('u1.fork(u2)', async () =>
	{
		var u1 = Unit(() =>
		{
			var x /* :string */ = context.input.x

			return { x: x + x }
		})

		var u2 = Unit(input =>
		{
			var x /* :string */ = input.x

			return { y: x + 'a' }
		})

		var u = u1.fork(u2)

		var context = Context({ x: '5' })

		var output = await u(context).output

		expect(output).deep.eq([ { x: '55' }, { y: '5a' } ])
	})

	it('(stream u1).fork(u2)', async () =>
	{
		var u1 = Unit(() =>
		{
			var s = stream(1)

			// eslint-disable-next-line max-nested-callbacks
			delay(25).then(() =>
			{
				s(2)
				s(3)
			})
			.delay(50)
			// eslint-disable-next-line max-nested-callbacks
			.then(() =>
			{
				s.end(true)
			})

			return s
		})

		var u2 = Unit(() =>
		{
			return 17
		})

		var u = u1.fork(u2)
		var context = Context(null)
		var outcome = u(context)

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var output = outcome.output

		expect(await output).deep.eq([ 3, 17 ])
		expect(await buffer).deep.eq([[ 1, 17 ], [ 2, 17 ], [ 3, 17 ]])
	})

	it('(stream u1).fork(stream u2)', async () =>
	{
		var s1 = stream(1)
		var s2 = stream(2)

		delay(25).then(() =>
		{
			s1(3)
		})
		.delay(25).then(() =>
		{
			s2(4)
		})
		.delay(25).then(() =>
		{
			s1(5)
		})
		.delay(25).then(() =>
		{
			s2.end(true)
		})
		.delay(25).then(() =>
		{
			s1.end(true)
		})

		var u1 = Unit(() => s1)
		var u2 = Unit(() => s2)

		var u = u1.fork(u2)
		var context = Context(null)
		var outcome = u(context)

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var output = outcome.output

		expect(await output).deep.eq([ 5, 4 ])
		expect(await buffer).deep.eq([
			[ 1, 2 ],
			[ 3, 2 ],
			[ 3, 4 ],
			[ 5, 4 ],
		])
	})

	it('(stream u1 Error).fork(stream u2)', async () =>
	{
		var s1 = stream(1)
		var s2 = stream(2)

		var error = new Error('e')

		delay(25).then(() =>
		{
			s1(3)
		})
		.delay(25).then(() =>
		{
			s2(error)
		})
		.delay(25).then(() =>
		{
			s1(5)
		})
		.delay(25).then(() =>
		{
			s2(6)
		})
		.delay(25).then(() =>
		{
			s2(error)
		})

		var u1 = Unit(() => s1)
		var u2 = Unit(() => s2)

		var u = u1.fork(u2)
		var context = Context(null)
		var outcome = u(context)

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var r = outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([
			[ 1, 2 ],
			[ 3, 2 ],
			error,
		])
	})

	it('(stream u1).fork(u2 throw)', async () =>
	{
		var s1 = stream(1)

		var error = new Error('e')

		var u1 = Unit(() => s1)
		var u2 = Unit(() => { throw error })

		var u = u1.fork(u2)
		var context = Context(null)
		var outcome = u(context)

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var r = outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([
			error,
		])
	})
})
