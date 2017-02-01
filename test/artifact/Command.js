/* @flow */

var Command = require('../../src/artifact/Command')

describe('Command', () =>
{
	it('works', () =>
	{
		var c = Command('echo', [])

		return c.construct()
	})

	it('disengages', () =>
	{
		var c = Command('sleep', [ '1000s' ])

		setTimeout(() =>
		{
			c.disengage()
		}
		, 1000)

		return c.construct()
	})
})
