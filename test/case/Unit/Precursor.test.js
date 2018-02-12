/* @flow */

import { expect } from 'chai'

import Promise from 'bluebird'
var delay = Promise.delay

import { stream } from 'flyd'

import { concat } from 'src/flyd/drain'

import Unit from 'src/Unit'
import Precursor from 'src/Unit/compose/Precursor'

import Context from 'src/Context'

describe('Precursor', () =>
{
	it('Precursor(u1, u2)', async () =>
	{
		var u1 = Unit((_, context) =>
		{
			var x /* :number */ = context.input.x + 17
			return { x }
		})

		var u2 = Unit(input =>
		{
			var x /* :number */ = input.x

			return { y: x + 2 }
		})

		var u = Precursor(u1, u2)

		var context = Context({ x: 5 })

		var output = await u(context).output

		expect(output).deep.eq({ y: 7 })
	})

	it('Precursor(u1, u2) throw', async () =>
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

		var u = Precursor(u1, u2)

		var context = Context({ x: 5 })

		await expect(u(context).output)
		.rejectedWith('no_pass')
	})

	it('u1.pre(u2)', async () =>
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

		var u = u1.pre(u2)

		var context = Context({ x: '5' })

		var output = await u(context).output

		expect(output).deep.eq({ y: '5a' })
	})

	it('(stream u1).pre(u2)', async () =>
	{
		var u1 = Unit(input =>
		{
			expect(input).deep.eq({ x: '5' })

			var s = stream({ x: 1 })

			// eslint-disable-next-line max-nested-callbacks
			delay(25).then(() =>
			{
				s({ x: 2 })
				s({ x: 3 })
			})
			.delay(25)
			// eslint-disable-next-line max-nested-callbacks
			.then(() =>
			{
				s.end(true)
			})

			return s
		})

		var u2 = Unit(input =>
		{
			var x /* :string */ = input.x

			return x + 'a'
		})

		var u = u1.pre(u2)
		var context = Context({ x: '5' })
		var outcome = u(context)

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var output = outcome.output

		expect(await output).eq('5a')
		expect(await buffer).deep.eq([ '5a', '5a', '5a' ])
	})

	it('(stream u1 Error).pre(u2)', async () =>
	{
		var error = new Error('e')

		/* eslint-disable max-nested-callbacks */
		var u1 = Unit(input =>
		{
			expect(input).deep.eq({ x: '5' })

			var s = stream({ x: 1 })

			delay(25).then(() =>
			{
				s({ x: 2 })
			})
			.delay(25)
			.then(() =>
			{
				s(error)
			})
			.delay(25)
			.then(() =>
			{
				/* check for dup */
				s(error)
			})

			return s
		})
		/* eslint-enable max-nested-callbacks */

		var u2 = Unit(input =>
		{
			var x /* :string */ = input.x

			return x + 'a'
		})

		var u = u1.pre(u2)
		var context = Context({ x: '5' })
		var outcome = u(context)

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var r = outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([ '5a', '5a', error ])
	})
})
