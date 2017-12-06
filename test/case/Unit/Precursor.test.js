/* @flow */

import { expect } from 'chai'

import Unit from 'src/Unit'
import Precursor from 'src/Unit/compose/Precursor'

import Context from 'src/Context'

describe('Precursor', () =>
{
	it('Precursor(u1, u2)', async () =>
	{
		var u1 = Unit(context =>
		{
			var x /* :number */ = context.input.x + 17
			return { x }
		})

		var u2 = Unit(context =>
		{
			var x /* :number */ = context.input.x

			return { y: x + 2 }
		})

		var u = Precursor(u1, u2)

		var context = Context({ x: 5 })

		var outcome = await u(context)

		expect(outcome.output).deep.eq({ y: 7 })
	})

	it('Precursor(u1, u2) throw', async () =>
	{
		var u1 = Unit(() =>
		{
			throw new Error('no_pass')
		})

		var u2 = Unit(context =>
		{
			var x /* :number */ = context.input.x

			return { y: x + 2 }
		})

		var u = Precursor(u1, u2)

		var context = Context({ x: 5 })

		await expect(u(context))
		.rejectedWith('no_pass')
	})

	it('u1.pre(u2)', async () =>
	{
		var u1 = Unit(() =>
		{
			var x /* :string */ = context.input.x

			return { x: x + x }
		})

		var u2 = Unit(context =>
		{
			var x /* :string */ = context.input.x

			return { y: x + 'a' }
		})

		var u = u1.pre(u2)

		var context = Context({ x: '5' })

		var outcome = await u(context)

		expect(outcome.output).deep.eq({ y: '5a' })
	})
})
