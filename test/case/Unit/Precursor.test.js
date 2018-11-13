/* @flow */

import { expect } from 'chai'

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
		var r = u(Context({ x: 5 }))

		var buffer  = await concat(r.stream)
		var promise = await r.promise

		expect(promise).deep.eq({ y: 7 })
		expect(buffer).deep.eq([ { y: 7 } ])
	})

	it('Precursor(u1, u2) throw', async () =>
	{
		var e = new Error('no_pass')

		var u1 = Unit(() => { throw e })

		var u2 = Unit((_, context) =>
		{
			var x /* :number */ = context.input.x

			return { y: x + 2 }
		})

		var u = Precursor(u1, u2)

		var r = u(Context({ x: 5 }))

		var buffer = await concat(r.stream)

		await expect(r.promise).rejectedWith('no_pass')
		expect(buffer).deep.eq([ e ])
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

		var r = u(Context({ x: '5' }))

		var buffer  = await concat(r.stream)
		var promise = await r.promise

		expect(promise).deep.eq({ y: '5a' })
		expect(buffer).deep.eq([ { y: '5a' } ])
	})

	it('(u1 Error).pre(u2)', async () =>
	{
		var e = new Error('no_pass')

		var u1 = Unit(() => { throw e })

		var u2 = Unit(() => 1)

		var u = u1.pre(u2)

		var r = u(Context(null))

		var buffer = await concat(r.stream)

		await expect(r.promise).rejectedWith('no_pass')
		expect(buffer).deep.eq([ e ])
	})

	it('async (u1 Error).pre(u2)', async () =>
	{
		var e = new Error('no_pass')

		var u1 = Unit(async () => { throw e })
		var u2 = Unit(async () => 1)

		var u = u1.pre(u2)

		var r = u(Context(null))

		var buffer = await concat(r.stream)

		await expect(r.promise).rejectedWith('no_pass')
		expect(buffer).deep.eq([ e ])
	})

	it('(u1).pre(u2 Error)', async () =>
	{
		var e = new Error('no_pass')

		var u1 = Unit(() => 1)
		var u2 = Unit(() => { throw e })

		var u = u1.pre(u2)

		var r = u(Context(null))

		var buffer = await concat(r.stream)

		await expect(r.promise).rejectedWith('no_pass')
		expect(buffer).deep.eq([ e ])
	})

	it('async (u1).pre(u2 Error)', async () =>
	{
		var e = new Error('no_pass')

		var u1 = Unit(async () => 1)
		var u2 = Unit(async () => { throw e })

		var u = u1.pre(u2)

		var r = u(Context(null))

		var buffer = await concat(r.stream)

		await expect(r.promise).rejectedWith('no_pass')
		expect(buffer).deep.eq([ e ])
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

		var buffer  = await concat(result.stream)
		var promise = await result.promise

		expect(promise).eq('5a')
		expect(buffer).deep.eq([ '5a', '5a', '5a' ])
	})

	it('async (stream u1).pre(u2)', async () =>
	{
		var u1 = Unit(async (input) =>
		{
			expect(input).deep.eq({ x: '5' })

			return replay(
			[
				{ x: 1 },
				{ x: 2 },
				{ x: 3 },
			])
		})

		var u2 = Unit(async (input) =>
		{
			var x /* :string */ = input.x

			return x + 'a'
		})

		var u = u1.pre(u2)
		var result = u(Context({ x: '5' }))

		var buffer  = await concat(result.stream)
		var promise = await result.promise

		expect(promise).eq('5a')
		expect(buffer).deep.eq([ '5a', '5a', '5a' ])
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
			(e) => e
		)
		var buffer = concat(result.stream)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([ '5a', '5a', error ])
	})

	it('async (stream u1 Error).pre(u2)', async () =>
	{
		var error = new Error('e')

		var u1 = Unit(async (input) =>
		{
			expect(input).deep.eq({ x: '5' })

			return replay(
			[
				{ x: 1 },
				{ x: 2 },
				error,
				error,
			])
		})

		var u2 = Unit(async (input) =>
		{
			var x /* :string */ = input.x

			return x + 'a'
		})

		var u = u1.pre(u2)
		var result = u(Context({ x: '5' }))

		var r = result.promise.then(
			()  => expect(false).true,
			(e) => e
		)
		var buffer = concat(result.stream)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([ '5a', '5a', error ])
	})
})
