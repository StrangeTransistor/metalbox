/* @flow */

import { inspect } from 'util'

import { expect } from 'chai'
import tcomb from 'tcomb'

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
		var outcome = invoke(input => input, Context(17), tcomb.Any)

		expect(outcome).property('stream')
		expect(outcome).property('output')

		var output = await outcome.output

		expect(output).eq(17)
	})

	it('Unit/invoke captures throw', async () =>
	{
		var error = new Error('e')

		var outcome = invoke(() => { throw error }, Context(null), tcomb.Any)

		var r = await outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})

	it('Unit/invoke validates', async () =>
	{
		var outcome = invoke(input => input, Context(17), tcomb.Number)

		await outcome.output
	})

	it('Unit/invoke validates throw', async () =>
	{
		var outcome = invoke(input => input, Context(17), tcomb.String)

		var r = await outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(r instanceof Error).true
		expect(r.message).eq('[tcomb] Invalid value 17 supplied to String')
	})
})
