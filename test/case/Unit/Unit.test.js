/* @flow */

import { inspect } from 'util'

import { expect } from 'chai'
import tcomb from 'src/tcomb'

import Context from 'src/Context'

import Unit   from 'src/Unit'
import invoke from 'src/Unit/_/invoke'

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

	it('Unit/invoke', async () =>
	{
		var options =
		{
			unit: (input) => input,
			input: tcomb.Any,
			family: null,
		}

		var outcome = invoke(options, Context(17))

		expect(outcome).property('stream')
		expect(outcome).property('output')

		var output = await outcome.output

		expect(output).eq(17)
	})

	it('Unit/invoke captures throw', async () =>
	{
		var error = new Error('e')
		var options =
		{
			unit: () => { throw error },
			input: tcomb.Any,
			family: null,
		}

		var outcome = invoke(options, Context(null))

		var r = await outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})

	it('Unit/invoke validates', async () =>
	{
		var options =
		{
			unit: (input) => input,
			input: tcomb.Number,
			family: null,
		}
		var outcome = invoke(options, Context(17))

		await outcome.output
	})

	it('Unit/invoke validates throw', async () =>
	{
		var options =
		{
			unit: (input) => input,
			input: tcomb.String,
			family: null,
		}
		var outcome = invoke(options, Context(17))

		var r = await outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(r instanceof Error).true
		expect(r.message).eq('Invalid value 17 supplied to String')
	})
})
