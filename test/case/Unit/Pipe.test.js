/* @flow */

import { expect } from 'chai'

import { stream } from 'flyd'

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

	it.only('(stream u1).pipe(u2)', async () =>
	{
		var u1 = Unit(() =>
		{
			var s = stream({ x: 1 })

			var s = stream()

			// eslint-disable-next-line max-nested-callbacks
			setTimeout(() =>
			{
				s({ x: 1 })
				s({ x: 2 })
				s({ x: 3 })
				s.end(true)
			}
			, 100)

			return s
		})

		var u2 = Unit((input) =>
		{
			var x /* :number */ = input.x
			// console.log('!', x)

			return x + 2
		})

		var u = u1.pipe(u2)

		var context = Context(null)

		var buffer = []

		var outcome = u(context)

		/* @flow-off */
		outcome.stream.map(x => buffer.push(x))

		var output = await outcome.output

		expect(buffer).deep.eq([ 3, 4, 5 ])
		expect(output).eq(5)
	})
})
