/* @flow */

import { inspect } from 'util'

import { expect } from 'chai'

import tcomb from 'src/tcomb'

import { delay } from 'bluebird'

import { concat } from 'src/flyd/drain'

import Context from 'src/Context'
import Unit from 'src/Unit'

import replay from 'test/replay'

describe('Unit', () =>
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
		var u = Unit(() => replay([ 1, 2, 3 ]))

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
		var u = Unit(async () => replay([ 1, 2, 3 ]))

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

		var u = Unit(() => replay([ 1, 2, error ]))

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

	it('Unit/Result stream error IN async', async () =>
	{
		var error = new Error('e')

		var u = Unit(async () => replay([ 1, 2, error ]))

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

	it('Unit/result timing', async () =>
	{
		var never = Unit(() => new Promise(() => {}))

		var r = never(Context(null))

		expect_hrtime(r.time.start)
		expect(r.time.stop).eq(null)
		expect(r.time.taken).eq(null)

		var u = Unit(() => delay(25))
		var r2 = u(Context(null))

		await r2.promise

		expect_hrtime(r2.time.start)
		/* @flow-off */
		expect_hrtime((r2.time.stop  /* :$Hrtime */))
		/* @flow-off */
		expect_hrtime((r2.time.taken /* :$Hrtime */))

		/* @flow-off */
		expect(r2.time.taken[0]).eq(0)
		/* @flow-off */
		expect(r2.time.taken[1] > 10e6).true
		/* @flow-off */
		expect(r2.time.taken[1] < 30e6).true

		function expect_hrtime (time /* :$Hrtime */)
		{
			expect(time).an('array')
			expect(time.length).eq(2)
			expect(time[0]).a('number')
			expect(time[1]).a('number')
		}
	})
})
