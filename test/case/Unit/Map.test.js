/* @flow */

import { expect } from 'chai'

import Unit from 'src/Unit'
import Context from 'src/Context'

describe('Unit as Map', () =>
{
	it('Unit/Map (fn)', async () =>
	{
		var context = Context(5)

		var unit = Unit((n /* :number */) => n + 2)

		var output = await unit(context).output

		expect(output).eq(7)
	})
})
