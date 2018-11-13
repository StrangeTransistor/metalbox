/* @flow */

import { inspect } from 'util'

import { expect } from 'chai'
import tcomb from 'src/tcomb'

import { concat } from 'src/flyd/drain'

import { stream as Stream } from 'flyd'

import Context from 'src/Context'
import Unit from 'src/Unit'

describe.only('Unit', () =>
{
	it('inspect', () =>
	{
		var u = Unit(() => {})

		expect(u).property('family')
		expect(u.family).a('string')
		expect(u.family).match(/^\d\d\d+\.\w\w\w$/)

		var i = u[inspect.custom]()
		expect(i).an('object')
		expect(i).property('family')
		expect(i.family).eq(u.family)

		u.family = 'foo'
		i = u[inspect.custom]()

		expect(i.family).eq(u.family)
	})

	it('inspect', () =>
	{
		var family = 'Name'

		var u = Unit(
		{
			family,
			unit () {},
		})

		expect(u.family).eq(family)
		var i = u[inspect.custom]()
		expect(i.family).eq(family)
	})

	it('Unit/Result', async () =>
	{
		var u = Unit(() => ({ x: 1, y: true }))

		var result = u(Context(null))

		expect(result).property('stream')
		expect(result).property('promise')

		var buffer = await concat(result.stream)
		var output = await result.promise

		expect(output).deep.eq({ x: 1, y: true })
		expect(buffer).deep.eq([ { x: 1, y: true } ])
	})

	it('Unit/Result sync throw', async () =>
	{
		var error = new Error('e')

		var u = Unit(() => { throw error })

		var result = u(Context(null))

		expect(result).property('stream')
		expect(result).property('promise')

		var buffer = await concat(result.stream)
		var output = await result.promise.then(
			()  => expect(false).true,
			(e) => e
		)

		expect(output).eq(error)
		expect(buffer).deep.eq([ error ])
	})

	it('Unit/Result async', async () =>
	{
		var u = Unit(async () => ({ x: 1, y: true }))

		var result = u(Context(null))

		expect(result).property('stream')
		expect(result).property('promise')

		var buffer = await concat(result.stream)
		var output = await result.promise

		expect(output).deep.eq({ x: 1, y: true })
		expect(buffer).deep.eq([ { x: 1, y: true } ])
	})

	it('Unit/Result async throw', async () =>
	{
		var error = new Error('e')

		var u = Unit(async () => { throw error })

		var result = u(Context(null))

		expect(result).property('stream')
		expect(result).property('promise')

		var buffer = await concat(result.stream)
		var output = await result.promise.then(
			()  => expect(false).true,
			(e) => e
		)

		expect(output).eq(error)
		expect(buffer).deep.eq([ error ])
	})

	it('Unit/Result stream', async () =>
	{
		var u = Unit(() =>
		{
			var s = Stream()

			setTimeout(() => s(1), 100)
			setTimeout(() => s(2), 100)
			setTimeout(() => s(3), 100)
			setTimeout(() => s.end(true), 100)

			return s
		})

		var result = u(Context(null))

		expect(result).property('stream')
		expect(result).property('promise')

		var buffer = await concat(result.stream)
		var output = await result.promise

		expect(output).eq(3)
		expect(buffer).deep.eq([ 1, 2, 3 ])
	})

	it('Unit/Result stream IN async', async () =>
	{
		var u = Unit(async () =>
		{
			var s = Stream()

			setTimeout(() => s(1), 100)
			setTimeout(() => s(2), 100)
			setTimeout(() => s(3), 100)
			setTimeout(() => s.end(true), 100)

			return s
		})

		var result = u(Context(null))

		expect(result).property('stream')
		expect(result).property('promise')

		var buffer = await concat(result.stream)
		var output = await result.promise

		expect(output).eq(3)
		expect(buffer).deep.eq([ 1, 2, 3 ])
	})

	it('Unit/Result stream error', async () =>
	{
		var error = new Error('e')

		var u = Unit(() =>
		{
			var s = Stream()

			setTimeout(() => s(1), 100)
			setTimeout(() => s(2), 100)
			setTimeout(() => s(error), 100)
			setTimeout(() => s.end(true), 100)

			return s
		})

		var result = u(Context(null))

		expect(result).property('stream')
		expect(result).property('promise')

		var buffer = await concat(result.stream)
		var r = await result.promise.then(
			()  => expect(false).true,
			(e) => e
		)

		expect(r).eq(error)
		expect(buffer).deep.eq([ 1, 2, error ])
	})

	it('Unit/Result validates', async () =>
	{
		var u = Unit(
		{
			unit: (input) => input,
			input: tcomb.Number,
			family: null,
		})

		var result = u(Context(17))

		await result.promise
	})

	it('Unit/Result validates throw', async () =>
	{
		var u = Unit(
		{
			unit: (input) => input,
			input: tcomb.String,
			family: null,
		})

		var result = u(Context(17))

		var r = await result.promise.then(
			()  => expect(false).true,
			(e) => e
		)

		expect(r instanceof Error).true
		expect(r.message).eq('Invalid value 17 supplied to String')
	})
})
