/* @flow */

var expect = require('chai').expect

var Artifact = require('../../src/artifact/Artifact')
var With = require('../../src/artifact/With')

describe('With', () =>
{
	it('works', () =>
	{
		var env_outer = { x: 1 }

		var art = Artifact(env_inner =>
		{
			expect(env_inner.x).eq(2)
			expect(env_inner.y).eq(3)
		})

		var art_with = With(art, env_outer =>
		{
			var env_inner =
			{
				x: env_outer.x + 1,
				y: 3
			}

			return env_inner
		})

		return art_with.construct(env_outer)
	})
})
