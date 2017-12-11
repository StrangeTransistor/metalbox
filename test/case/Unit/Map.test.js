/* @flow */

import { expect } from 'chai'

import Unit from 'src/Unit'
import Context from 'src/Context'

describe('Map', () =>
{
	it('Map(fn)', async () =>
	{
		var context = Context(5)

		var unit = Unit((n /* :number */) => n + 2)

		var outcome = await unit(context)

		expect(outcome.output).eq(7)
	})
})
