/* @flow */

import { expect } from 'chai'

import Unit from 'src/Unit'
import Context from 'src/Context'

import cast from 'src/Unit/_/cast'

describe('cast', () =>
{
	it('cast()', () =>
	{
		var u = cast()

		expect(Unit.is(u)).ok
		expect(u.family).eq('Identity')
	})

	it('cast(fn)', async () =>
	{
		var u = cast(x => x + 17)
		expect(Unit.is(u)).ok

		var result = u(Context(0))

		expect(await result.promise).eq(17)
	})

	it('cast(unit)', () =>
	{
		var u = Unit(x => x)
		var uc = cast(u)

		expect(Unit.is(uc)).ok
		expect(u).eq(uc)
	})

	it('cast(wrong) throw', () =>
	{
		expect(() =>
		{
			/* @flow-off OK */
			return cast(1)
		})
		.throw()
	})
})
