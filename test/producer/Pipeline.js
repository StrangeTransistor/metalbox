/* @flow */

var expect = require('chai').expect

var resolve = require('bluebird').resolve

var Pipeline = require('../../src/producer/Pipeline')

describe('Frontend', () =>
{
	var P /* :Producer<*, string> */ = () =>
	{
		return resolve('abc')
	}

	var upper /* :Pipe<string, string, *> */ = (input) =>
	{
		return input.toUpperCase()
	}

	var split /* :Pipe<string, Array<string>, *> */ = (input) =>
	{
		return input.split('')
	}

	it('works', () =>
	{
		var p = Pipeline(P, upper, split)

		return p()
		.then(it =>
		{
			expect(it).eql([ 'A', 'B', 'C' ])
		})
	})

	it('works', () =>
	{
		var P = () =>
		{
			return 'CdE'
		}

		var p = Pipeline(P, upper, split)

		return p()
		.then(it =>
		{
			expect(it).eql([ 'C', 'D', 'E' ])
		})
	})
})
