/* @flow */

import { expect } from 'chai'

import { concat } from 'src/flyd/drain'

import Context from 'src/Context'
import Unit from 'src/Unit'

import Let  from 'src/Unit/Let'

import { expect_context } from '../Context.test'

import replay from 'test/replay'

describe('Let', () =>
{
	it('replaces context', async () =>
	{
		var context = Context(17)

		var u = Let((input, context) =>
		{
			expect(input).eq(17)
			expect(context.input).eq(17)

			expect_context(context)

			return Context('foo')
		}
		, Unit((input, context) =>
		{
			expect(input).eq('foo')
			expect(context.input).eq('foo')

			expect_context(context)
		}))

		await u(context)
	})

	it('can derive', async () =>
	{
		var c1 = Context(17)

		var u = Let((input, context) =>
		{
			return context.derive(input - 10)
		}
		, Unit((input, c2) =>
		{
			expect(input).eq(7)
			expect(c2.input).eq(7)

			expect_context(c2)

			expect(c1).not.deep.eq(c2)
		}))

		await u(c1)
	})

	it('can derive with providers', async () =>
	{
		var c1 = Context(17, { foo: 1 })

		var u = Let((input, context) =>
		{
			return context.derive(input - 10,
			{
				foo: (context.providers.foo + 1),
				bar: 1
			})
		}
		, Unit((input, c2) =>
		{
			expect(input).eq(7)
			expect(c2.input).eq(7)

			expect(c2.providers).an('object')
			expect(c2.providers).deep.eq(
			{
				foo: 2,
				bar: 1,
			})

			expect_context(c2)

			expect(c1).not.deep.eq(c2)
		}))

		await u(c1)
	})

	it('can work with streaming', async () =>
	{
		var t = Unit(input =>
		{
			expect(input).eq(17)

			return replay([ 1, 2, 3 ])
		})

		var u = Let(async (input) =>
		{
			expect(input).eq(10)

			return Context(input + 7)
		}
		, t)

		var result = u(Context(10))

		var buffer = await concat(result.stream)
		var output = await result.promise

		expect(output).eq(3)
		expect(buffer).deep.eq([ 1, 2, 3 ])
	})
})
