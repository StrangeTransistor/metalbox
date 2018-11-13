/* @flow */

import { expect } from 'chai'

import Promise from 'bluebird'
var delay = Promise.delay

import { stream } from 'flyd'

import { concat } from 'src/flyd/drain'

import Unit from 'src/Unit'
import Precursor from 'src/Unit/compose/Precursor'

import Context from 'src/Context'

describe.only('Precursor', () =>
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

		var promise = await u(context).promise

		expect(promise).deep.eq({ y: 7 })
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

		await expect(u(context).promise)
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

		var promise = await u(context).promise

		expect(promise).deep.eq({ y: '5a' })
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
		var result = u(context)

		var promise = result.promise
		var buffer = concat(result.stream)

		expect(await promise).eq('5a')
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
		var result = u(context)

		var r = result.promise.then(
		()  => expect(false).true,
		(e) => e)
		var buffer = concat(result.stream)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([ '5a', '5a', error ])
	})
})
