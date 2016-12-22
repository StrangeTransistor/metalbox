/* @flow */

var expect = require('chai').expect

var Artifact = require('../../src/artifact/Artifact')

describe('Artifact', () =>
{
	it('works', () =>
	{
		var side = 0

		var a = Artifact(env =>
		{
			side = side + env.inc
		})

		expect(a).an('object')
		expect(a).property('construct')
		expect(a.construct).a('function')

		return a.construct({ inc: 1 })
		.then(r =>
		{
			expect(r).an('undefined')
			expect(side).eq(1)
		})
	})

	it('throws', () =>
	{
		var a = Artifact(() =>
		{
			throw new Error
		})

		expect(a).an('object')
		expect(a).property('construct')
		expect(a.construct).a('function')

		return a.construct({ inc: 1 })
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
