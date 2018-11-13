/* @flow */

import { expect } from 'chai'

import Promise from 'bluebird'
var delay = Promise.delay

import { stream } from 'flyd'

import { concat } from 'src/flyd/drain'

import Context from 'src/Context'

import Unit from 'src/Unit'
import Fork from 'src/Unit/compose/Fork'

import replay from 'test/replay'

describe.only('Fork', () =>
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

		var promise = await u(context).promise

		expect(promise).deep.eq([ { x: 7 }, { y: 17 } ])
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

		await expect(u(context).promise)
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

		var promise = await u(context).promise

		expect(promise).deep.eq([ { x: '55' }, { y: '5a' } ])
	})

	it('(stream u1).fork(u2)', async () =>
	{
		var u1 = Unit(input =>
		{
			expect(input).deep.eq({ x: 17 })

			return replay([ 1, 2, 3 ])
		})

		var u2 = Unit(input =>
		{
			return input.x
		})

		var u = u1.fork(u2)
		var context = Context({ x: 17 })
		var result = u(context)

		var promise = result.promise
		var buffer  = concat(result.stream)

		expect(await promise).deep.eq([ 3, 17 ])
		expect(await buffer).deep.eq([[ 1, 17 ], [ 2, 17 ], [ 3, 17 ]])
	})

	it('(stream u1).fork(stream u2)', async () =>
	{
		var s1 = stream(1)
		var s2 = stream(2)

		delay(25).then(() =>
		{
			s1(3)
		})
		.delay(25).then(() =>
		{
			s2(4)
		})
		.delay(25).then(() =>
		{
			s1(5)
		})
		.delay(25).then(() =>
		{
			s1.end(true)
		})
		.delay(25).then(() =>
		{
			s2(6)
		})
		.delay(25).then(() =>
		{
			s2.end(true)
		})

		var u1 = Unit(() => s1)
		var u2 = Unit(() => s2)

		var u = u1.fork(u2)
		var context = Context(null)
		var result = u(context)

		var promise = result.promise
		var buffer  = concat(result.stream)

		expect(await promise).deep.eq([ 5, 6 ])
		expect(await buffer).deep.eq([
			[ 1, 2 ],
			[ 3, 2 ],
			[ 3, 4 ],
			[ 5, 4 ],
			[ 5, 6 ],
		])
	})

	it('(stream u1 Error).fork(stream u2)', async () =>
	{
		var s1 = stream(1)
		var s2 = stream(2)

		var error = new Error('e')

		delay(25).then(() =>
		{
			s1(3)
		})
		.delay(25).then(() =>
		{
			s2(error)
		})
		.delay(25).then(() =>
		{
			s1(5)
		})
		.delay(25).then(() =>
		{
			s2(6)
		})
		.delay(25).then(() =>
		{
			s2(error)
		})
		.delay(25).then(() =>
		{
			s1(new Error('not'))
		})

		var u1 = Unit(() => s1)
		var u2 = Unit(() => s2)

		var u = u1.fork(u2)
		var context = Context(null)
		var result = u(context)

		var r = result.promise.then(
		()  => expect(false).true,
		(e) => e)
		var buffer = concat(result.stream)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([
			[ 1, 2 ],
			[ 3, 2 ],
			error,
		])
	})

	it('(stream u1).fork(u2 throw)', async () =>
	{
		var s1 = stream(1)

		var error = new Error('e')

		var u1 = Unit(() => s1)
		var u2 = Unit(() => { throw error })

		var u = u1.fork(u2)
		var context = Context(null)
		var result = u(context)

		var r = result.promise.then(
		()  => expect(false).true,
		(e) => e)
		var buffer = concat(result.stream)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([
			error,
		])
	})

	it('(stream payload) pipe to (fork u1 u2)', async () =>
	{
		var s = stream(1)

		var p = Unit(() => s)

		var u1 = Unit(n => n + 1)
		var u2 = Unit(n => n * 2)

		delay(25).then(() =>
		{
			s(2)
		})
		.delay(25).then(() =>
		{
			s(3)
		})
		.delay(25).then(() =>
		{
			s(4)
		})
		.delay(25).then(() =>
		{
			s.end(true)
		})

		var u = p.pipe(u1.fork(u2))
		var result = u(Context(null))

		var promise = result.promise
		var buffer  = concat(result.stream)

		expect(await promise).deep.eq([ 5, 8 ])
		expect(await buffer).deep.eq([
			[ 2, 2 ],
			[ 3, 4 ],
			[ 4, 6 ],
			[ 5, 8 ],
		])
	})
})
