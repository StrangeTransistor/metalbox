/* @flow */

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

		var y = outcome.output.y

		if (y !== 7)
		{
			throw new TypeError
		}
	})
})
