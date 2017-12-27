/* @flow */

import { expect } from 'chai'

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
})
