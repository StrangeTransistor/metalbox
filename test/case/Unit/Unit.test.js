/* @flow */

import { inspect } from 'util'

import { expect } from 'chai'
import tcomb from 'src/tcomb'

import Context from 'src/Context'

import Result from 'src/Context'

import Unit   from 'src/Unit'

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
		var options =
		{
			unit: (input) => input,
			input: tcomb.Any,
			family: null,
		}

		var result = Result(options.unit, Context(17), options)

		expect(result).property('stream')
		expect(result).property('promise')

		var output = await result.promise

		expect(output).eq(17)
	})

	it('Unit/Result captures throw', async () =>
	{
		var error = new Error('e')
		var options =
		{
			unit: () => { throw error },
			input: tcomb.Any,
			family: null,
		}

		var result = Result(options.unit, Context(null), options)

		var r = await result.promise.then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})

	it('Unit/Result validates', async () =>
	{
		var options =
		{
			unit: (input) => input,
			input: tcomb.Number,
			family: null,
		}
		var result = Result(options.unit, Context(17), options)

		await result.promise
	})

	it('Unit/Result validates throw', async () =>
	{
		var options =
		{
			unit: (input) => input,
			input: tcomb.String,
			family: null,
		}
		var result = Result(options.unit, Context(17), options)

		var r = await result.promise.then(
		()  => expect(false).true,
		(e) => e)

		expect(r instanceof Error).true
		expect(r.message).eq('Invalid value 17 supplied to String')
	})
})
