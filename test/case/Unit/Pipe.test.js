/* @flow */

import { expect } from 'chai'

import Promise from 'bluebird'
var delay = Promise.delay

import { stream } from 'flyd'

import { concat } from 'src/drain'

import Unit from 'src/Unit'
import Pipe from 'src/Unit/compose/Pipe'

import Context from 'src/Context'

describe('Pipe / Unit.pipe', () =>
{
	it('Pipe(u1, u2)', async () =>
	{
		var u1 = Unit((_, context) =>
		{
			var x /* :number */ = context.input.x
			return { x }
		})

		var u2 = Unit((input) =>
		{
			var x /* :number */ = input.x

			return { y: x + 2 }
		})

		var u = Pipe(u1, u2)

		var context = Context({ x: 5 })

		var output = await u(context).output

		expect(output).deep.eq({ y: 7 })
	})

	it('u1.pipe(u2)', async () =>
	{
		var u1 = Unit((_, context) =>
		{
			var x /* :number */ = context.input.x
			return { x }
		})

		var u2 = Unit((input) =>
		{
			var x /* :number */ = input.x

			return { y: x + 2 }
		})

		var u = u1.pipe(u2)

		var context = Context({ x: 5 })

		var output = await u(context).output

		expect(output).deep.eq({ y: 7 })
	})

	it('(stream u1).pipe(u2)', async () =>
	{
		var u1 = Unit(initial =>
		{
			expect(initial).eq(17)

			var s = stream({ x: 1 })

			// eslint-disable-next-line max-nested-callbacks
			delay(50).then(() =>
			{
				s({ x: 2 })
				s({ x: 3 })
			})
			.delay(50)
			// eslint-disable-next-line max-nested-callbacks
			.then(() =>
			{
				s.end(true)
			})

			return s
		})

		var u2 = Unit((input) =>
		{
			var x /* :number */ = input.x

			return x + 2
		})

		var u = u1.pipe(u2)
		var context = Context(17)
		var outcome = u(context)

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var output = outcome.output

		expect(await output).eq(5)
		expect(await buffer).deep.eq([ 3, 4, 5 ])
	})

	it('(stream u1 Error).pipe(u2)', async () =>
	{
		var error = new Error('e')

		/* eslint-disable max-nested-callbacks */
		var u1 = Unit(initial =>
		{
			expect(initial).eq(17)

			var s = stream({ x: 1 })

			delay(50).then(() =>
			{
				s({ x: 2 })
			})
			.delay(50)
			.then(() =>
			{
				s(error)
			})
			.delay(50)
			.then(() =>
			{
				/* check for dup */
				s(error)
			})

			return s
		})
		/* eslint-enable max-nested-callbacks */

		var u2 = Unit((input) =>
		{
			var x /* :number */ = input.x

			return x + 2
		})

		var u = u1.pipe(u2)
		var context = Context(17)
		var outcome = u(context)

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var r = outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([ 3, 4, error ])
	})

	it('(stream u1).pipe(u2 Error)', async () =>
	{
		var error = new Error('e')

		var buffer_spy = []

		var u1 = Unit(() =>
		{
			var s = stream(1)

			/* eslint-disable max-nested-callbacks */
			delay(50)
			.then(() => s(2))
			.delay(50)
			.then(() => s(3))

			s.map(v => buffer_spy.push(v))
			/* eslint-enable max-nested-callbacks */

			return s
		})

		var u2 = Unit(input =>
		{
			if (input === 2)
			{
				throw error
			}

			return input
		})

		var u = u1.pipe(u2)
		var context = Context(null)
		var outcome = u(context)

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var r = outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([ 1, error ])
		expect(buffer_spy).deep.eq([ 1, 2 ])
	})
})
