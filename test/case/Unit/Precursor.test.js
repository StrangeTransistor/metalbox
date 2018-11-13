/* @flow */

import { expect } from 'chai'

import Promise from 'bluebird'
var delay = Promise.delay

import { stream } from 'flyd'

import { concat } from 'src/flyd/drain'

import Context from 'src/Context'

import Unit from 'src/Unit'
import Precursor from 'src/Unit/compose/Precursor'

import replay from 'test/replay'

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

		var promise = await u(Context({ x: 5 })).promise

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

		await expect(u(Context({ x: 5 })).promise)
		.rejectedWith('no_pass')
	})

	it('u1.pre(u2)', async () =>
	{
		var u1 = Unit((_, context) =>
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

		var promise = await u(Context({ x: '5' })).promise

		expect(promise).deep.eq({ y: '5a' })
	})

	it('(stream u1).pre(u2)', async () =>
	{
		var u1 = Unit(input =>
		{
			expect(input).deep.eq({ x: '5' })

			return replay(
			[
				{ x: 1 },
				{ x: 2 },
				{ x: 3 },
			])
		})

		var u2 = Unit(input =>
		{
			var x /* :string */ = input.x

			return x + 'a'
		})

		var u = u1.pre(u2)
		var result = u(Context({ x: '5' }))

		var promise = result.promise
		var buffer = concat(result.stream)

		expect(await promise).eq('5a')
		expect(await buffer).deep.eq([ '5a', '5a', '5a' ])
	})

	it('(stream u1 Error).pre(u2)', async () =>
	{
		var error = new Error('e')

		var u1 = Unit(input =>
		{
			expect(input).deep.eq({ x: '5' })

			return replay(
			[
				{ x: 1 },
				{ x: 2 },
				error,
				error,
			])

			return s
		})

		var u2 = Unit(input =>
		{
			var x /* :string */ = input.x

			return x + 'a'
		})

		var u = u1.pre(u2)
		var result = u(Context({ x: '5' }))

		var r = result.promise.then(
		()  => expect(false).true,
		(e) => e)
		var buffer = concat(result.stream)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([ '5a', '5a', error ])
	})
})
