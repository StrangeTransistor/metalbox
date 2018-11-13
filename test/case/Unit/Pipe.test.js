/* @flow */

import { expect } from 'chai'

import Promise from 'bluebird'
var delay = Promise.delay

import { stream } from 'flyd'

import { concat } from 'src/flyd/drain'

import Context from 'src/Context'

import Unit from 'src/Unit'
import Pipe from 'src/Unit/compose/Pipe'

import replay from 'test/replay'

describe.only('Pipe / Unit.pipe', () =>
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

		var promise = await u(context).promise

		expect(promise).deep.eq({ y: 7 })
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

		var promise = await u(context).promise

		expect(promise).deep.eq({ y: 7 })
	})

	it('(stream u1).pipe(u2)', async () =>
	{
		var u1 = Unit(initial =>
		{
			expect(initial).eq(17)

			return replay(
			[
				{ x: 1 },
				{ x: 2 },
				{ x: 3 },
			])
		})

		var u2 = Unit((input) =>
		{
			var x /* :number */ = input.x

			return x + 2
		})

		var u = u1.pipe(u2)
		var context = Context(17)
		var result = u(context)

		var promise = result.promise
		var buffer  = concat(result.stream)

		expect(await promise).eq(5)
		expect(await buffer).deep.eq([ 3, 4, 5 ])
	})

	it('(stream u1 Error).pipe(u2)', async () =>
	{
		var error = new Error('e')

		/* eslint-disable max-nested-callbacks */
		var u1 = Unit(initial =>
		{
			expect(initial).eq(17)

			return replay(
			[
				{ x: 1 },
				{ x: 2 },
				error,
				error,
			])
		})
		/* eslint-enable max-nested-callbacks */

		var u2 = Unit((input) =>
		{
			var x /* :number */ = input.x

			return x + 2
		})

		var u = u1.pipe(u2)
		var context = Context(17)
		var result = u(context)

		var r = result.promise.then(
		()  => expect(false).true,
		(e) => e)
		var buffer = concat(result.stream)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([ 3, 4, error ])
	})

	it('(stream u1).pipe(u2 Error)', async () =>
	{
		var error = new Error('e')

		var buffer_spy = []

		var u1 = Unit(() =>
		{
			var s = replay([ 1, 2, 3 ])

			s.map(v => buffer_spy.push(v))
			/* eslint-enable max-nested-callbacks */

			return s
		})

		var u2 = Unit(input =>
		{
			if (input === 2)
			{
				throw error
			}

			return input
		})

		var u = u1.pipe(u2)
		var context = Context(null)
		var result = u(context)

		var r = result.promise.then(
		()  => expect(false).true,
		(e) => e)
		var buffer = concat(result.stream)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([ 1, error ])
		expect(buffer_spy).deep.eq([ 1, 2 ])
	})

	it('(stream u1).pipe(u2 Error).pipe(effect)', async () =>
	{
		var error = new Error('e')

		var b2 = []
		var b3 = []

		var u1 = Unit(() =>
		{
			return replay([ 1, 2, 3, 4 ])
		})

		var u2 = Unit(async (input) =>
		{
			b2.push(input)

			if (input === 3)
			{
				throw error
			}

			return (input * 10)
		})

		var u3 = Unit(async (input) =>
		{
			b3.push(input)

			return (input * 10)
		})

		var u = u1.pipe(u2).pipe(u3)
		var context = Context(null)

		var result = u(context)

		var r = result.promise.then(
		()  => expect(false).true,
		(e) => e)
		var b = concat(result.stream)

		expect(await r).eq(error)
		expect(await b).deep.eq([ 100, 200, error ])
		expect(b2).deep.eq([ 1, 2, 3 ])
		expect(b3).deep.eq([ 10, 20 ])
	})
})
