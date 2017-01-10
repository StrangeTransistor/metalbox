/* @flow */

var expect = require('chai').expect

var Artifact = require('../../src/artifact/Artifact')

describe('Artifact', () =>
{
	it('works', () =>
	{
		var side = 0

		var art = Artifact(env =>
		{
			side = side + env.inc
		})

		expect(art).an('object')
		expect(art).property('construct')
		expect(art.construct).a('function')
		expect(art.disengage).a('function')
		expect(art.describe).a('function')

		expect(art.describe()).eq('[Artifact]')

		return art.construct({ inc: 1 })
		.then(r =>
		{
			expect(r).an('undefined')
			expect(side).eq(1)
		})
	})

	it('throws', () =>
	{
		var art = Artifact(() =>
		{
			throw new Error
		})

		expect(art).an('object')
		expect(art).property('construct')
		expect(art.construct).a('function')
		expect(art.disengage).a('function')
		expect(art.describe).a('function')

		expect(art.describe()).eq('[Artifact]')

		return art.construct({ inc: 1 })
		.then(() =>
		{
			expect(0, 'must throw').eq(1)
		},
		e =>
		{
			expect(e).an('error')
		})
	})
})
