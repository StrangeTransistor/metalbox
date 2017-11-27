/* @flow */

import { expect } from 'chai'

import Unit from 'src/Unit'
import Context from 'src/Context'

describe('Pipe', () =>
{
	it('Pipe(u1, u2)', async () =>
	{
		var u1 = Unit(context =>
		{
			var x /* :number */ = context.input.x
			return { x }
		})

		var u2 = Unit(context =>
		{
			var x /* :number */ = context.input.x

			return { y: x + 2 }
		})

		var u = u1.pipe(u2)

		var context = Context({ x: 5 })

		var outcome = await u(context)

		expect(outcome.output).deep.eq({ y: 7 })
	})
})
