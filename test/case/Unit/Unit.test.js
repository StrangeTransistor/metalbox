/* @flow */

import { inspect } from 'util'

import { expect } from 'chai'

import Unit from 'src/Unit'

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
})
