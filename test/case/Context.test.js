/* @flow */

import { expect } from 'chai'

import Context from 'src/Context'

describe('Context', () =>
{
	it('Context(input)', () =>
	{
		var context = Context(17)

		expect_context(context)

		expect(context.input).eq(17)
	})

	it('Context(input, providers)', () =>
	{
		var context = Context(null, { x: 1, y: true })

		expect_context(context)

		expect(context.providers).property('x').eq(1)
		expect(context.providers).property('y').eq(true)
	})

	it('context.derive(input)', () =>
	{
		var context = Context(17)

		expect_context(context)

		var derived = context.derive({ x: 1 })

		expect(context.input).eq(17)
		expect(derived.input).deep.eq({ x: 1 })
	})

	function expect_context (context)
	{
		expect(context).property('input')

		expect(context).property('once')
		expect(context).property('live')

		expect(context).property('engine')

		expect(context).property('providers')
	}
})
