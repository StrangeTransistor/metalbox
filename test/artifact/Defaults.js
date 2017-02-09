/* @flow */

var expect = require('chai').expect

var Artifact = require('../../src/artifact/Artifact')
var Defaults = require('../../src/artifact/Defaults')

describe('Defaults', () =>
{
	it('works', () =>
	{
		var data = { x: 1 }
		var defaults = { x: 0, y: 2 }

		var art = Artifact((env /* :{ x: number, y: number } */) =>
		{
			expect(env.x).eq(1)
			expect(env.y).eq(2)
		})

		var def = Defaults(defaults, art)

		return def.construct(data)
	})
})
