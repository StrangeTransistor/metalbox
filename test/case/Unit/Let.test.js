/* @flow */

import { stream } from 'flyd'

import { expect } from 'chai'

import Context from 'src/Context'

import Unit from 'src/Unit'

import Let  from 'src/Unit/Let'

import { expect_context } from '../Context.test'

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

	/* eslint-disable max-nested-callbacks */
	it('can work with streaming', async () =>
	{
		var t = Unit(input =>
		{
			expect(input).eq(7)

			var s = stream(1)

			setTimeout(() => s(2), 0)
			setTimeout(() => s(3), 0)
			setTimeout(() => s.end(true), 0)

			return s
		})

		var u = Let(async () => Context(7), t)

		var r = await u(Context(0)).output

		expect(r).eq(3)
	})
	/* eslint-enable max-nested-callbacks */
})
